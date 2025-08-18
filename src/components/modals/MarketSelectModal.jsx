import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function MarketSelectModal({
  open,
  markets,
  current,
  onSelect,
  onClose,
}) {
  const navigate = useNavigate();
  if (!open) return null;

  const body = (
    <>
      {/* 딤 */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* 패널 */}
      <div className="fixed z-50 left-1/2 top-20 -translate-x-1/2 w-[220px] rounded-xl bg-white shadow-lg ring-1 ring-black/5">
        <ul className="py-2">
          {markets.map((m) => (
            <li key={m}>
              <button
                onClick={() => {
                  onSelect(m);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-50 ${
                  m === current
                    ? "font-bold text-emerald-700"
                    : "text-slate-700"
                }`}
              >
                {m}
              </button>
            </li>
          ))}
          <li className="mt-1 border-t border-slate-100">
            <button
              onClick={() => navigate("/market-setting")}
              className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700"
            >
              내 시장 추가
            </button>
          </li>
        </ul>
      </div>
    </>
  );

  return createPortal(body, document.body);
}
