import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MarketSettingPage from "./pages/MarketSettingPage";
import AddProduct from "./pages/AddProduct";
import AddStore from "./pages/AddStore";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import ProductDetailModal from "./components/modals/ProductDetailModal";
import ProductPreview from "./pages/ProductPreview";

// 초기 가게 데이터를 App 컴포넌트 밖이나 안으로 옮깁니다.
const INITIAL_STORES_DATA = {
  "dolsan-jokbal": { id: "dolsan-jokbal", name: '돌산 족발', rating: 4.15, reviewCount: 319, imageUrl: 'https://placehold.co/600x400/E2E8F0/334155?text=Dolsan+Jokbal', address: '전남 여수시 시교4길 8-3', hours: '06:00 - 20:30', phone: '061-642-7089', paymentMethods: ['인생회복 소비쿠폰', '온누리 상품권', '제로페이', '카카오페이'], menu: [ { name: '족발', description: '국내산 생족을 매일 직접 삶아 부드럽고 쫄깃한 식감이 일품입니다.', imageUrl: 'https://placehold.co/100x100/F9A8D4/1F2937?text=Jokbal', options: [{ name: '소', price: 28000 }, { name: '중', price: 33000 }, { name: '대', price: 38000 }] }, { name: '보쌈', description: '기름기는 쫙 빼고 살코기의 담백함은 살렸습니다. 부드러운 보쌈을 즐겨보세요.', imageUrl: 'https://placehold.co/100x100/A7F3D0/1F2937?text=Bossam', price: 35000 } ] },
  "suki-tteokjip": { id: "suki-tteokjip", name: '숙이 떡집', rating: 4.8, reviewCount: 152, imageUrl: 'https://placehold.co/600x400/FBCFE8/831843?text=Suki+Tteokjip', address: '전남 여수시 서교3길 12-1', hours: '08:00 - 18:00', phone: '061-123-4567', paymentMethods: ['온누리 상품권', '카카오페이'], menu: [ { name: '꿀떡', description: '쫀득한 떡에 달콤한 꿀이 가득!', imageUrl: 'https://placehold.co/100x100/F5D0A9/A16207?text=Honey+Tteok', price: 3000 }, { name: '인절미', description: '고소한 콩고물이 듬뿍 묻어있는 인절미', imageUrl: 'https://placehold.co/100x100/FDE68A/854D0E?text=Injeolmi', price: 4000 } ] }
};


export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDataForPreview, setProductDataForPreview] = useState(null);
  const [stores, setStores] = useState(INITIAL_STORES_DATA);

  const handleSelectProduct = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);
  
  const handleRegisterStore = (newStoreData) => {
    const newStoreId = newStoreData.shopId.toString();
    const newStore = { ...newStoreData, id: newStoreId };
    
    setStores(prevStores => ({
      ...prevStores,
      [newStoreId]: newStore
    }));

    return newStoreId;
  };

  const handleAddToCart = (cartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.name === cartItem.name && item.optionName === cartItem.optionName
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += cartItem.quantity;
        return newCart;
      } else {
        return [...prevCart, cartItem];
      }
    });
    handleCloseModal();
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const handlePreview = (productData) => {
    setProductDataForPreview(productData);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-200">
      <div className="w-full max-w-md h-screen bg-white shadow-lg flex flex-col relative">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage stores={stores} />} />
            <Route path="/market-setting" element={<MarketSettingPage />} />
            <Route
              path="/store/:shopId"
              element={
                <StorePage
                  onSelectProduct={handleSelectProduct}
                  cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
                />
              }
            />
            <Route path="/add-product" element={<AddProduct onPreview={handlePreview} />} />
            {productDataForPreview && (
              <Route path="/preview" element={<ProductPreview productData={productDataForPreview} />} />
            )}
            <Route path="/add-store" element={<AddStore onRegister={handleRegisterStore} />} />
            <Route
              path="/cart"
              element={<CartPage cartItems={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem}/>}
            />
          </Routes>
        </BrowserRouter>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
}