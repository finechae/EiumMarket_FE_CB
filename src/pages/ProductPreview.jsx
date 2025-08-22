import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 아이콘 SVG 컴포넌트들 ---
function BackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function ProductPreview({ productData, onConfirm }) {
  const navigate = useNavigate();

  const mainImageUrl = useMemo(() => {
    if (productData.images && productData.images.length > 0) {
      // File 객체로부터 URL을 생성합니다.
      return URL.createObjectURL(productData.images[0]);
    }
    return null;
  }, [productData.images]);

  const hasOptions = productData.options && productData.options.length > 0;

  const handleConfirm = () => {
    // onConfirm prop이 있다면 호출 (예: 상위 컴포넌트에서 API 호출)
    onConfirm?.(productData);
    alert('상품이 최종 등록되었습니다!');
    navigate('/'); // 등록 후 메인 페이지로 이동
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center p-4 border-b flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-1"><BackIcon /></button>
        <h1 className="text-lg font-bold text-center flex-grow">입력하신 정보를 확인해주세요</h1>
        <div className="w-6"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {mainImageUrl ? (
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img src={mainImageUrl} alt="상품 대표 이미지" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">이미지 없음</span>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow-sm divide-y">
            <InfoRow label="상품명" value={productData.name} />
            <InfoRow label="카테고리" value={productData.category} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-2">
              {hasOptions ? '가격 옵션' : '가격'}
            </h3>
            {hasOptions ? (
              <ul className="divide-y">
                {productData.options.map((option, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                     <span className="text-sm text-gray-800">{option.name}</span>
                     <span className="text-sm font-semibold text-gray-900">
                       {new Intl.NumberFormat('ko-KR').format(option.price || 0)}원
                     </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-bold text-gray-900">
                  {new Intl.NumberFormat('ko-KR').format(productData.price || 0)}원
                </span>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-2">상세 설명</h3>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{productData.description}</p>
          </div>
        </div>
      </main>

      <footer className="p-4 border-t bg-white grid grid-cols-2 gap-3 flex-shrink-0">
        <button type="button" onClick={() => navigate('/add-product')} className="w-full rounded-lg bg-gray-200 text-gray-700 py-3 text-sm font-bold hover:bg-gray-300 transition-colors">수정하기</button>
        <button type="button" onClick={handleConfirm} className="w-full rounded-lg bg-emerald-500 text-white py-3 text-sm font-bold hover:bg-emerald-600 transition-colors">최종 등록하기</button>
      </footer>
    </div>
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-sm font-bold text-gray-500">{label}</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
);