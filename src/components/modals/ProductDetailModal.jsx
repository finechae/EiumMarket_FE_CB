import { useState, useMemo } from 'react';

// X 아이콘 (닫기 버튼용)
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  // 단일 가격 상품의 경우, 가상의 옵션을 만들어 동일한 로직으로 처리
  const options = useMemo(() => {
    if (product.options && product.options.length > 0) {
      return product.options;
    }
    return [{ name: '기본', price: product.price }];
  }, [product]);

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = selectedOption.price * quantity;

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.name}-${selectedOption.name}-${Date.now()}`, // 고유 ID 생성
      name: product.name,
      optionName: selectedOption.name,
      price: selectedOption.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    };
    onAddToCart(cartItem);
  };

  return (
    // 배경색을 반투명한 검은색(rgba(0,0,0,0.5))으로 직접 지정합니다.
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-end z-50">
      {/* 실제 모달 컨텐츠에 애니메이션 클래스(animate-slide-up) 추가 */}
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="p-1"><XIcon /></button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>

        {options.length > 1 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">옵션 선택</h3>
            <div className="space-y-2">
              {options.map(option => (
                <label key={option.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{option.name}</span>
                    <span className="text-gray-600 ml-2">{option.price.toLocaleString()}원</span>
                  </div>
                  <input
                    type="radio"
                    name="product-option"
                    checked={selectedOption.name === option.name}
                    onChange={() => setSelectedOption(option)}
                    className="h-5 w-5 text-indigo-600"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 my-6">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full border text-lg font-bold">-</button>
          <span className="text-xl font-bold w-12 text-center">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full border text-lg font-bold">+</button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">총 금액</span>
          <span className="text-2xl font-bold">{totalPrice.toLocaleString()}원</span>
        </div>
        <button onClick={handleAddToCart} className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600">
          {quantity}개 장바구니에 담기
        </button>
      </div>
    </div>
  );
}
