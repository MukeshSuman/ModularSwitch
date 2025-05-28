import React, { useState } from "react";

export const FanTouchSwitchComponent: React.FC = () => {
  const [level, setLevel] = useState(0);
  const maxLevel = 5;

  const handleUp = () => {
    setLevel((prev) => (prev < maxLevel ? prev + 1 : maxLevel));
  };

  const handleDown = () => {
    setLevel((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div
      className="w-full h-full rounded-xl relative shadow-md flex flex-col items-center justify-center gap-3 text-cyan-500"
    >
      {/* Up arrow button */}
      <button
        className="text-3xl font-bold select-none"
        onClick={(e) => {
          e.stopPropagation();
          handleUp();
        }}
      >
        ▲
      </button>

      {/* Fan icon */}
      <div className="text-2xl text-cyan-500">🌀</div>

      {/* Down arrow button */}
      <button
        className="text-3xl font-bold select-none"
        onClick={(e) => {
          e.stopPropagation();
          handleDown();
        }}
      >
        ▼
      </button>

      {/* Speed dots aligned right */}
      <div className="absolute right-3 top-2 bottom-2 flex flex-col-reverse justify-center gap-1">
        {Array.from({ length: maxLevel }).map((_, i) => (
          <div
            key={i}
            className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${
              i < level
                ? "bg-cyan-400 shadow-[0_0_6px_2px_#00faff]"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
