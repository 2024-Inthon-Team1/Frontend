import NavigationBar from "../components/mainFooter/NavigationBar";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ChatListPage() {
  const userId = useSelector(state => state.user.userId);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // 실제 채팅 목록 데이터를 불러올 경우 API 요청을 통해 데이터를 가져옵니다.
    // 예시 데이터로서 가짜 데이터를 사용합니다.
    const fetchChatList = async () => {
      const dummyData = [
        { id: 1, name: "홍길동", lastMessage: "안녕하세요!", time: "오후 2:30" },
        { id: 2, name: "김철수", lastMessage: "오늘 회의는?", time: "오전 10:15" },
        { id: 3, name: "이영희", lastMessage: "잘 지내세요?", time: "어제" }
      ];
      setChatList(dummyData);
    };
    
    fetchChatList();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-12"></div>
      <div className="flex-1 overflow-y-auto">
        {chatList.map(chat => (
          <Chatting
            key={chat.id}
            name={chat.name}
            lastMessage={chat.lastMessage}
            time={chat.time}
          />
        ))}
      </div>
      <NavigationBar />
    </div>
  );
}

function Chatting({ name, lastMessage, time }) {
  return (
    <div className="w-full flex items-center justify-between h-16 px-4 border-gray-200">
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300"></div>
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