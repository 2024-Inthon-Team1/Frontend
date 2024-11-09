import React, { useState, useEffect, useRef } from "react";
import socket from "../api/socket";

//icons
import { PiCassetteTape } from "react-icons/pi";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { FiCamera, FiMic } from "react-icons/fi"; // 추가 아이콘

import { useLocation } from "react-router-dom"; // 테스트용

function ChatPage() {
  const location = useLocation(); // 테스트용
  const userId = new URLSearchParams(location.search).get("userId") || "user1"; // 테스트용
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [roomId] = useState("1"); // 일단 1
  const textareaRef = useRef(null); // textarea에 접근할 수 있는 ref 생성
  const [showOptions, setShowOptions] = useState(false); // 옵션 표시 상태

  useEffect(() => {
    socket.emit("join_room", { roomId, userId });

    socket.on("new_message", (msg) => {
      setMessageList((prevMessageList) => [...prevMessageList, msg]);
      console.log("new_msg");
    });

    return () => {
      socket.emit("leave_room");
      socket.removeAllListeners();
    };
  }, [roomId, userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const chatMessage = {
        roomId,
        userId,
        message
      };

      socket.emit("send_message", chatMessage, (response) => {
        if (response.status === "ok") {
          setMessage(""); // 입력 필드 초기화
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // 높이를 한 줄로 초기화
          }
        }
      });
    }
  };

  return (
    <div className="bg-blue-100 h-screen flex flex-col">
      <div className="w-full h-14 flex items-center bg-blue-100">
        <MdOutlineKeyboardArrowLeft className="h-10 w-9"/>
        <div className="rounded-full h-7 w-7 bg-gray-400 mr-2"></div>
        <div className="font-semibold text-xl">상대아이디</div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Chatting messageList={messageList} userId={userId}/>
      </div>
      <div className="flex items-center p-3 bg-white border-t relative">
        <FaRegSquarePlus 
          className="h-7 w-7 pr-2 cursor-pointer" 
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <div className="absolute bottom-16 left-4 bg-white shadow-lg rounded-md p-2 flex flex-col gap-2">
            <button className="flex items-center gap-2" onClick={() => console.log("사진 보내기")}>
              <FiCamera className="h-5 w-5" /> 사진 보내기
            </button>
            <button className="flex items-center gap-2" onClick={() => console.log("음성 보내기")}>
              <FiMic className="h-5 w-5" /> 음성 보내기
            </button>
            <button className="flex items-center gap-2" onClick={() => console.log("카세트 보내기")}>
              <PiCassetteTape className="h-5 w-5" /> 카세트 보내기
            </button>
          </div>
        )}
        <form 
          onSubmit={sendMessage} 
          className="flex items-center w-full bg-gray-100 rounded-full px-5 py-4"
        >
          <textarea
            ref={textareaRef}
            placeholder="메시지 입력"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto"; // 높이를 초기화하여 자동 조정이 시작될 수 있도록 함
              e.target.style.height = `${Math.min(e.target.scrollHeight, 72)}px`;
            }}
            className="flex-grow bg-transparent outline-none resize-none overflow-y-auto"
            rows={1}
            style={{ maxHeight: "4.5rem" }}
          />
          <button 
            type="submit"
            disabled={message === ""}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <IoSendSharp className="w-6 h-6"/>
          </button>
        </form>
        <PiCassetteTape className="h-7 w-9 pl-2 pr-1"/>
      </div>
    </div>
  );
}

function Chatting({ messageList, userId }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="h-full overflow-y-auto p-4">
      {messageList.map((msg, index) => {
        const timestamp = msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp);
        const isCurrentUser = msg.userId === userId;
        const isLastMessageFromUser =
          index === messageList.length - 1 || messageList[index + 1].userId !== msg.userId;
        
        const justifyClass = isCurrentUser ? "justify-end" : "justify-start";
        const bgColor = isCurrentUser ? "bg-blue-400" : "bg-gray-300";
        const textColor = isCurrentUser ? "text-white" : "text-black";

        return (
          <div key={index} className={`flex ${justifyClass} items-center`}>
            {(isCurrentUser && isLastMessageFromUser) ? (<div className="text-xs text-gray-400 mr-0.5 self-end mt-0"> {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>) : null}
            {!isCurrentUser && isLastMessageFromUser ? (
                <div className="rounded-full h-6 w-6 bg-gray-400 mr-2"></div>
            ) : (!isCurrentUser ? <div className="rounded-full h-7 w-7 mr-2"></div> : null)}
            <div className={`inline-block max-w-56 rounded-3xl ${bgColor} ${textColor} p-3 mt-1 text-sm leading-tight whitespace-pre-wrap text-start`}>
              {msg.message}
            </div>
            {(!isCurrentUser && isLastMessageFromUser) ? (<div className="text-xs text-gray-400 ml-0.5 self-end mt-0"> {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>) : null}
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatPage;