import { useSelector } from 'react-redux';

function ChatListPage() {
  // const userId = useSelector(state => state.user.userId);
  // console.log(userId);
  return (
    <div>
      <div className="h-12"></div>
      <Chatting />
    </div>
  );
}

function Chatting() {
  return (
    <>
      <div className="w-full flex h-16 items-center justify-start">
        <div className="rounded-full h-10 w-10 bg-gray-300 mx-3"></div>
        <div className="font-6semibold">이름</div>
        <div className="flex-grow"></div>
        <div className="mr-6 text-gray-300 font-3light">오후 00:00</div>
      </div>
    </>
  );
}

export default ChatListPage;
