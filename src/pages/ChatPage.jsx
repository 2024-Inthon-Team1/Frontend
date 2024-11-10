import { useState, useEffect, useRef } from 'react';
import socket from '../api/socket';
import { PiCassetteTape } from 'react-icons/pi';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { IoSendSharp } from 'react-icons/io5';
import { AiOutlinePicture } from "react-icons/ai";
import { IoMicOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId') || 'user1';
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const optionsRef = useRef(null);
  const textareaRef = useRef(null);
  const [roomId] = useState('1');

  useEffect(() => {
    // 소켓 연결 및 방 입장
    socket.emit('join_room', { roomId, userId });

    // 새로운 메시지 수신 시 messageList 업데이트
    socket.on('new_message', (messageData) => {
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.emit('leave_room');
      socket.off('new_message');
    };
  }, [roomId, userId]);

  const sendMessage = e => {
    e.preventDefault();
    if (message.trim().length > 0) {
      const chatMessage = {
        roomId,
        userId,
        type: "text",
        content: message,
        audioBlob: null,
        imageBlob: null,
        timestamp: new Date(),
      };

      // 서버로 텍스트 메시지 전송
      socket.emit('send_message', chatMessage, response => {
        if (response.status === 'ok') {
          setMessage('');
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
          }
        }
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = event => {
        chunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        chunksRef.current = [];
        if (confirm("녹음한 내용을 전송하시겠습니까?")) {
          sendAudioMessage(audioBlob);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('음성 녹음 실패:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const sendAudioMessage = (audioBlob) => {
    const chatMessage = {
      roomId,
      userId,
      type: "audio",
      content: null,
      audioBlob,
      imageBlob: null,
      timestamp: new Date(),
    };

    // 서버로 오디오 메시지 전송
    socket.emit('send_message', chatMessage, response => {
      if (response.status === 'ok') {
        console.log('오디오 메시지 전송 성공');
      }
    });
  };

  const sendImageMessage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBlob = new Blob([new Uint8Array(reader.result)], { type: file.type });
        if (confirm("선택한 이미지를 전송하시겠습니까?")) {
          const chatMessage = {
            roomId,
            userId,
            type: "image",
            content: null,
            audioBlob: null,
            imageBlob,
            timestamp: new Date(),
          };

          // 서버로 이미지 메시지 전송
          socket.emit('send_message', chatMessage, response => {
            if (response.status === 'ok') {
              console.log('이미지 메시지 전송 성공');
            }
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="bg-blue-100 h-screen flex flex-col">
      <div className="w-full h-14 flex items-center bg-blue-100">
        <MdOutlineKeyboardArrowLeft className="h-10 w-9" />
        <div className="rounded-full h-8 w-8 bg-gray-300 mx-3"></div>
        <div className="font-semibold text-xl">상대아이디</div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Chatting messageList={messageList} userId={userId} />
      </div>
      <div className="flex items-center p-3 bg-white border-t relative">
        <FaRegSquarePlus
          className="h-7 w-7 pr-2"
          onClick={() => setShowOptions(prev => !prev)}
        />
        {showOptions && (
          <div ref={optionsRef} className="absolute bottom-16 left-4 bg-white border rounded-lg shadow-lg p-2">
            <button className="w-full text-left px-3 py-2 flex items-center" onClick={() => console.log('카세트 보내기')}>
              <PiCassetteTape className="h-7 w-9 pr-1" />
              <span>카세트</span>
            </button>
            <label className="w-full text-left px-3 py-2 flex items-center cursor-pointer">
              <AiOutlinePicture className="h-7 w-9 pr-1" />
              <span>이미지</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={sendImageMessage}
              />
            </label>
            <button
              className="w-full text-left px-3 py-2 flex items-center"
              onClick={isRecording ? stopRecording : startRecording}
            >
              <IoMicOutline className="h-7 w-9 pr-1" />
              <span>{isRecording ? '녹음 중지' : '음성녹음'}</span>
            </button>
          </div>
        )}
        <form
          onSubmit={sendMessage}
          className="flex items-center w-full bg-gray-100 rounded-2xl px-3 py-2"
        >
          <textarea
            ref={textareaRef}
            placeholder="메시지 입력"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onInput={e => {
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 72)}px`;
            }}
            className="flex-grow bg-transparent outline-none resize-none overflow-y-auto"
            rows={1}
            style={{ maxHeight: '4.5rem' }}
          />
          <button
            type="submit"
            disabled={message === ''}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <IoSendSharp className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Chatting({ messageList, userId }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <div className="h-full overflow-y-auto p-4">
      {messageList.map((msg, index) => {
        const isCurrentUser = msg.userId === userId;
        const justifyClass = isCurrentUser ? 'justify-end' : 'justify-start';
        const bgColor = isCurrentUser ? 'bg-blue-400' : 'bg-gray-300';
        const textColor = isCurrentUser ? 'text-white' : 'text-black';

        return (
          <div key={index} className={`flex ${justifyClass} items-center`}>
            {msg.type === "text" && (
              <div className={`inline-block max-w-56 rounded-3xl ${bgColor} ${textColor} p-3 mt-1 text-sm leading-tight whitespace-pre-wrap text-start`}>
                {msg.content}
              </div>
            )}
            {msg.type === "audio" && (
              <audio controls src={URL.createObjectURL(msg.audioBlob)} className="mt-2" />
            )}
            {msg.type === "image" && (
              <img src={URL.createObjectURL(msg.imageBlob)} alt="sent" className="mt-2 max-w-xs rounded-lg" />
            )}
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatPage;