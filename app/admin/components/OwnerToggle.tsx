"use client";

import { useEffect, useState } from "react";

export default function OwnerToggle() {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(localStorage.getItem("is_owner") === "1");
  }, []);

  function toggle() {
    if (isOwner) {
      localStorage.removeItem("is_owner");
      setIsOwner(false);
    } else {
      localStorage.setItem("is_owner", "1");
      setIsOwner(true);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 ${
        isOwner
          ? "bg-emerald-500 text-white"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {isOwner ? "✓ オーナーモード ON（完了数に含まれない）" : "オーナーモード OFF"}
    </button>
  );
}
