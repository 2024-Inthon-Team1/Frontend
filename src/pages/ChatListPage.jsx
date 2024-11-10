import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavigationBar from '../components/mainFooter/NavigationBar';
import { useNavigate } from 'react-router-dom';

function ChatListPage() {
  const userId = useSelector(state => state.user.userId);
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 실제 채팅 목록 데이터를 불러올 경우 API 요청을 통해 데이터를 가져옵니다.
    // 예시 데이터로서 가짜 데이터를 사용합니다.
    const fetchChatList = async () => {
      const dummyData = [
        {
          roomId: 1,
          name: '홍길동',
          lastMessage: '안녕하세요!',
          time: '오후 2:30',
        },
        {
          roomId: 2,
          name: '김빛나',
          lastMessage: '안녕?',
          time: '오전 10:15',
        },
        {
          roomId: 3,
          name: '이영희',
          lastMessage: '잘 지내세요?',
          time: '어제',
        },
      ];
      setChatList(dummyData);
    };

    fetchChatList();
  }, []);

  return (
    <div className="flex flex-col h-screen mt-10">
      <div className="h-12 font-bold text-2xl">CHAT</div>
      <div className="flex-1 overflow-y-auto">
        {chatList.map(chat => (
          <Chatting
            key={chat.roomId} // roomId로 key 수정
            name={chat.name}
            lastMessage={chat.lastMessage}
            time={chat.time}
            onClick={() => navigate('/chat')} // onClick 이벤트 전달
          />
        ))}
      </div>
      <NavigationBar />
    </div>
  );
}
// const userId = useSelector(state => state.user.userId);
// console.log(userId);
{
  /* return (
    <div>
      <div className="h-12"></div>
      <Chatting />
    </div>
  ); */
}
function Chatting({ name, lastMessage, time, onClick }) {
  return (
    <div
      onClick={onClick} // 클릭 핸들러 추가
      className="w-full flex items-center justify-between h-16 px-4 border-b border-gray-500 cursor-pointer"
    >
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300 mr-3"></div>
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-gray-500 text-xs ml-3">{lastMessage}</div>
        </div>
      </div>
      <div className="text-gray-400 text-xs">{time}</div>
    </div>
  );
}

export default ChatListPage;
