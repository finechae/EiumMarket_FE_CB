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

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDataForPreview, setProductDataForPreview] = useState(null);

  const handleSelectProduct = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const handleAddToCart = (cartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.name === cartItem.name && item.optionName === cartItem.optionName
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
    // 실제 페이지 이동은 각 컴포넌트에서 useNavigate를 사용해 처리합니다.
  };

  return (
    // 배경색을 지정하고 스마트폰 화면을 중앙에 배치합니다.
    <div className="min-h-screen flex justify-center bg-gray-200">
      {/* 이 div가 모든 페이지를 감싸는 스마트폰 모양의 '틀'이 됩니다. */}
      <div className="w-full max-w-md h-screen bg-white shadow-lg flex flex-col relative">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/market-setting" element={<MarketSettingPage />} />
            <Route
              path="/store"
              element={
                <StorePage
                  onSelectProduct={handleSelectProduct}
                  cartItemCount={cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                />
              }
            />
            <Route
              path="/add-product"
              element={<AddProduct onPreview={handlePreview} />}
            />
            {productDataForPreview && (
              <Route
                path="/preview"
                element={<ProductPreview productData={productDataForPreview} />}
              />
            )}
            <Route path="/add-store" element={<AddStore />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              }
            />
          </Routes>
        </BrowserRouter>

        {/* 모달은 라우터 밖에 두어 어떤 페이지에서든 표시될 수 있도록 합니다. */}
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