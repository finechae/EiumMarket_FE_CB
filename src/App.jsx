import React from "react";
import "./App.css"; // 이 파일은 다음 단계에서 만듭니다.

/** 메인 화면(사진과 동일한 섹션만) */
export default function App() {
  const popular = [
    {
      name: "숙이 떡집",
      desc: "전통 떡과 한과 전문점",
      distance: "1.4km",
      open: true,
      emoji: "🍡",
    },
    {
      name: "돌산 족발",
      desc: "신선한 족발과 보쌈 전문",
      distance: "1.2km",
      open: true,
      emoji: "🍖",
    },
  ];

  const categories = [
    { name: "숙이 떡집", color: "cat-orange", emoji: "🍡" },
    { name: "돌산 족발", color: "cat-pink", emoji: "🍖" },
    { name: "식품", color: "cat-yellow", emoji: "🍜" },
    { name: "의류", color: "cat-blue", emoji: "👔" },
    { name: "생활용품", color: "cat-green", emoji: "🧴" },
    { name: "식당", color: "cat-purple", emoji: "🏪" },
    { name: "과일", color: "cat-softpink", emoji: "🍎" },
    { name: "수산물", color: "cat-cyan", emoji: "🐟" },
    { name: "정육점", color: "cat-rose", emoji: "🥩" },
  ];

  return (
    <div className="phone-frame">
      {/* 헤더 + 검색 */}
      <header className="header-grad px">
        <div className="top-row">
          <div className="icon-circle" title="알림">
            🔔
          </div>

          <div className="location-chip">
            <span className="pin">📍</span>
            <span className="loc-text">여수 서시장</span>
            <span className="chev">▾</span>
          </div>

          <div className="icon-circle" title="내 정보">
            👤
          </div>
        </div>

        <div className="search-wrap">
          <span className="search-ico">🔎</span>
          <input className="search-input" placeholder="오늘의 장보기 시작!" />
        </div>
      </header>

      {/* 배너 */}
      <section className="section px">
        <div className="card banner shadow-xl">
          <div className="banner-img">
            <img src="korean-market-storefront.png" alt="전통시장" />
          </div>
        </div>
      </section>

      {/* 자주 찾는 가게 */}
      <section className="section px">
        <div className="row-between">
          <h3 className="sec-title">자주 찾는 가게</h3>
          <button className="link-btn">전체보기</button>
        </div>

        <div className="grid-2">
          {popular.map((s, i) => (
            <div key={i} className="card shop-card shadow">
              <div className="shop-icon">
                <span className="emoji">{s.emoji}</span>
              </div>
              <div className="shop-name">{s.name}</div>
              <div className="shop-desc">{s.desc}</div>
              <div className="shop-meta">
                <span className="distance">{s.distance}</span>
                {s.open && <span className="badge-green">현재 영업중</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리 */}
      <section className="section px">
        <h3 className="sec-title">카테고리</h3>
        <div className="grid-3">
          {categories.map((c, i) => (
            <div key={i} className="card category-card shadow">
              <div className={`category-icon ${c.color}`}>
                <span className="emoji">{c.emoji}</span>
              </div>
              <div className="category-name">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 오늘의 특가 */}
      <section className="section px">
        <h3 className="sec-title">오늘의 특가</h3>
        <div className="card deal-card shadow">
          <div className="deal-icon">🥕</div>
          <div className="deal-body">
            <div className="deal-title">신선한 당근</div>
            <div className="deal-desc">유기농 당근 1kg</div>
            <div className="price-row">
              <span className="price-now">3,500원</span>
              <span className="price-old">5,000원</span>
              <span className="badge-sale">30% 할인</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
