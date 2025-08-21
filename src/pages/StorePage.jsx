import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 아이콘 SVG 컴포넌트들 ---
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

const mockStoreData = {
  name: '돌산족발',
  rating: 4.15,
  reviewCount: 319,
  imageUrl: 'https://placehold.co/600x400/E2E8F0/334155?text=Store+Image',
  address: '전남 여수시 시교4길 8-3',
  hours: '06:00 - 20:30',
  phone: '061-642-7089',
  paymentMethods: ['인생회복 소비쿠폰', '온누리 상품권', '제로페이', '카카오페이'],
  menu: [
    { name: '족발', description: '국내산 생족을 매일 직접 삶아 부드럽고 쫄깃한 식감이 일품입니다.', imageUrl: 'https://placehold.co/100x100/F9A8D4/1F2937?text=Jokbal', options: [{ name: '소', price: 28000 }, { name: '중', price: 33000 }, { name: '대', price: 38000 }] },
    { name: '보쌈', description: '기름기는 쫙 빼고 살코기의 담백함은 살렸습니다. 부드러운 보쌈을 즐겨보세요.', imageUrl: 'https://placehold.co/100x100/A7F3D0/1F2937?text=Bossam', price: 35000 }
  ]
};

export default function StorePage({ onSelectProduct, cartItemCount }) {
  const [activeTab, setActiveTab] = useState('메뉴');
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  const TabButton = ({ name }) => (
    <button onClick={() => setActiveTab(name)} className={`flex-1 pb-2 text-center font-bold ${activeTab === name ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>
      {name}
    </button>
  );

  return (
    <div className="h-full bg-white flex flex-col relative">
      {/* 헤더와 메인 영역을 분리합니다. */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 상단 정보 (헤더 역할): 이 부분은 스크롤되지 않습니다. */}
        <div className="flex-shrink-0">
          <div className="w-full h-48 bg-gray-200"><img src={mockStoreData.imageUrl} alt={mockStoreData.name} className="w-full h-full object-cover" /></div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{mockStoreData.name}</h1>
              <HeartIcon />
            </div>
            <div className="flex items-center mt-1 text-sm">
              <StarIcon />
              <span className="font-bold ml-1">{mockStoreData.rating}</span>
              <span className="text-gray-500 ml-1">({mockStoreData.reviewCount})</span>
            </div>
          </div>
          <div className="flex justify-around border-b px-4">
            <TabButton name="홈" />
            <TabButton name="지도" />
            <TabButton name="메뉴" />
          </div>
        </div>

        {/* 메인 콘텐츠: 이 부분만 스크롤됩니다. */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === '홈' && 
            <div className="p-4 space-y-6">
              <InfoSection icon={<LocationIcon />} text={mockStoreData.address} />
              <InfoSection icon={<ClockIcon />} text={mockStoreData.hours} />
              <InfoSection icon={<PhoneIcon />} text={mockStoreData.phone} isCopyable={true} />
              <div>
                <h3 className="font-bold mb-2">결제수단</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {mockStoreData.paymentMethods.map(method => <p key={method}>- {method}</p>)}
                </div>
              </div>
            </div>
          }
          {activeTab === '지도' && 
            <div className="p-4 text-center text-gray-500">
              지도 기능은 준비 중입니다.
            </div>
          }
          {activeTab === '메뉴' && (
            <ul className="divide-y">
              {mockStoreData.menu.map((item, index) => (
                <li key={index} onClick={() => onSelectProduct(item)} className="flex items-start justify-between p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex-grow pr-4">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-2">{item.description}</p>
                    <div className="space-y-1 text-gray-800">
                      {item.options && item.options.length > 0 ? (
                        item.options.map((option, optIndex) => (
                          <div key={optIndex} className="text-sm">
                            {option.name} <span className="font-semibold">{option.price.toLocaleString()}원</span>
                          </div>
                        ))
                      ) : (
                        <div className="font-bold text-base">{item.price.toLocaleString()}원</div>
                      )}
                    </div>
                  </div>
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>

      {/* 장바구니 아이콘: 클릭 시 /cart 경로로 이동합니다. */}
      {cartItemCount > 0 && (
        <div className="absolute bottom-6 right-6">
          <button onClick={() => navigate('/cart')} className="bg-indigo-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center">
            <CartIcon />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
          </button>
        </div>
      )}
    </div>
  );
}

const InfoSection = ({ icon, text, isCopyable = false }) => (
  <div className="flex items-center text-gray-700">
    <div className="mr-3 flex-shrink-0">{icon}</div>
    <span className="flex-grow">{text}</span>
    {isCopyable && <button className="text-xs text-gray-500 border rounded-full px-2 py-0.5 ml-2">복사</button>}
  </div>
);