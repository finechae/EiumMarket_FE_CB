import React from "react";
import { useNavigate } from "react-router-dom";

export default function MarketSettingPage() {
  const navigate = useNavigate();
  const popular = [
    { name: "신기종합시장", addr: "여수 신기동", reviews: 25 },
    { name: "신기제일시장", addr: "여수 신기동", reviews: 27 },
  ];

  return (
    <div className="max-w-[390px] mx-auto bg-white min-h-screen">
      <div className="flex items-center gap-3 px-4 h-12">
        <button onClick={() => navigate(-1)} className="text-2xl">
          ✕
        </button>
        <h1 className="text-lg font-extrabold">시장 설정</h1>
      </div>

      <div className="h-[300px] bg-sky-200 flex items-center justify-center">
        <span className="text-sky-900 font-bold">지도 영역</span>
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-slate-800 font-extrabold mb-2">인근 시장</h2>
        {popular.map((m) => (
          <button
            key={m.name}
            className="w-full text-left rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
            onClick={() => navigate(-1)} // 선택 후 뒤로
          >
            <div className="font-bold">{m.name}</div>
            <div className="text-sm text-slate-500">
              리뷰 {m.reviews} · {m.addr}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
