import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MarketSettingPage from "./pages/MarketSettingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/market-setting" element={<MarketSettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
