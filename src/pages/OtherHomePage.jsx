import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAdd, MdEdit } from 'react-icons/md'; // 연필 아이콘 추가
import NavigationBar from '../components/mainFooter/NavigationBar';
import albumImage from '../assets/album.jpeg';
import defaultProfile from '../assets/BasicUser.svg'; // 기본 프로필 이미지 가져오기
import { FaCog } from 'react-icons/fa';

const OtherHomePage = ({ id }) => {
  const userId = useSelector(state => state.user?.userId || 'User');
  const userProfile = useSelector(state => state.user?.profileImage); // 프로필 이미지 가져오기
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // 현재 화면에 표시된 항목
  const [allItems, setAllItems] = useState([]); // 모든 항목을 저장
  const [visibleCount, setVisibleCount] = useState(12); // 현재 화면에 보이는 항목 수
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [initialLoad, setInitialLoad] = useState(true); // 첫 로딩 상태 추가

  // 목 데이터를 생성하는 함수 (백엔드에서 데이터를 가져오는 것처럼 모방)
  const fetchDataFromBackend = async userId => {
    // 실제로는 이곳에서 백엔드에 요청을 보내 데이터를 가져옴 (예: axios, fetch 사용)
    await new Promise(resolve => setTimeout(resolve, 500)); // 백엔드 통신 시의 지연 시간 모방
    return Array.from({ length: 100 }, (_, index) => ({
      id: `${userId}-${index}`, // 전달받은 userId와 index로 고유한 id 생성
      imageUrl: albumImage,
    }));
  };

  // 처음에 데이터를 한 번만 가져옴
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await fetchDataFromBackend(id);
      setAllItems(data); // 전체 데이터를 저장
      setItems(data.slice(0, visibleCount)); // 처음 보여줄 데이터 설정
      setInitialLoad(false); // 첫 로딩 완료 후 초기 로딩 상태 비활성화
    };

    loadInitialData();
  }, [id]); // id가 변경될 때마다 데이터를 다시 가져오도록 설정

  // 스크롤 시 추가 데이터 로드
  const loadMoreItems = async () => {
    if (loading || visibleCount >= allItems.length) return;

    setLoading(true); // 로딩 상태 활성화
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 로딩 대기
    setItems(allItems.slice(0, visibleCount + 12)); // 다음 12개 항목 추가
    setVisibleCount(prevCount => prevCount + 12); // 보여줄 항목 수 증가
    setLoading(false); // 로딩 상태 비활성화
  };

  // Intersection Observer 설정
  const observer = useRef();
  const lastItemRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreItems(); // 추가 데이터 로드
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, visibleCount, allItems]
  );

  // 모달 형태의 로딩 스피너
  const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="loader"></div>
      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div className="bg-[#eee] h-screen w-full relative">
      {/* 고정된 상단 컨테이너 */}
      <div className="fixed top-0 w-full z-30 bg-[#eee] pt-[20px] pb-[0px]">
        <div className="flex justify-center pt-[50px] mx-5">
          {/* 프로필 이미지 영역 */}
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={userProfile || defaultProfile}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-[20px]">
            <div className="flex flex-row align-center text-left text-[20px] font-7bold">
              {userId}
            </div>
            <div className="text-left text-[#aaa] text-[16px] font-5medium mt-[-3px]">
              기본 정보 보기
            </div>
          </div>
          <FaCog
            size={24}
            className="text-[#aaa] ml-auto mt-[10px] cursor-pointer"
            onClick={() => navigate('/profile')}
          />
        </div>
        <div className="flex px-5 py-[10px] bg-[#fff] rounded-[20px] mt-[20px] mx-5 items-center">
          <div className="text-[18px] font-7bold">#MENOW</div>
        </div>
        <div
          onClick={() => navigate('/search')}
          className="mt-[20px] bg-[#ddd] rounded-xl mx-[20px] font-7bold text-[20px] py-[10px]"
        >
          테이프 선물하기 🎁
        </div>
        <div
          className="h-[20px] bg-[#ddd] mt-[20px]"
          style={{
            backgroundImage: "url('./assets/MainBg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="flex justify-between items-center mx-5 rounded-xl">
          <span className="font-8extrabold text-[20px] my-[10px]">
            COLLECTION
          </span>
          <MdOutlineAdd className="text-[24px]" />
        </div>
      </div>

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="pt-[380px] overflow-auto h-full pb-[100px]">
        <div className="grid grid-cols-3 gap-1 mx-5">
          {items.map((item, index) => {
            const isLastItem = index === items.length - 1;
            return (
              <div
                key={item.id}
                ref={isLastItem ? lastItemRef : null} // 마지막 요소에만 ref 추가
                className="w-full aspect-square cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt="Album"
                  className="w-full h-full object-cover"
                  onClick={() =>
                    navigate('/albumscroll', {
                      state: { selectedIndex: index },
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 첫 로딩 이후 스크롤에 의한 로딩 시에만 모달 형태의 로딩 스피너 표시 */}
      {!initialLoad && loading && <LoadingSpinner />}

      {/* NavigationBar는 항상 화면 최상단에 있도록 설정 */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <NavigationBar active="my" />
      </div>
    </div>
  );
};

export default OtherHomePage;
