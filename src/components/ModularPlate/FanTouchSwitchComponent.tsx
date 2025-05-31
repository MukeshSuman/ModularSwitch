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
    <div className="w-full h-full rounded-xl relative shadow-md flex flex-col items-center justify-center gap-3 text-cyan-500">
      {/* Up arrow button */}
      <button
        className="text-3xl font-bold select-none"
        onClick={(e) => {
          e.stopPropagation();
          handleUp();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-up"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Fan icon */}
      <div className="text-2xl text-cyan-500">
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="text-cyan-500"
        >
          <circle className="center" cx="50" cy="50" r="4" fill="#06b6d4" />

          <g transform="rotate(0 50 50)">
            <rect
              className="blade"
              x="48"
              y="26"
              width="4"
              height="18"
              rx="2"
              fill="#06b6d4"
            />
          </g>

          <g transform="rotate(120 50 50)">
            <rect
              className="blade"
              x="48"
              y="26"
              width="4"
              height="18"
              rx="2"
              fill="#06b6d4"
            />
          </g>

          <g transform="rotate(240 50 50)">
            <rect
              className="blade"
              x="48"
              y="26"
              width="4"
              height="18"
              rx="2"
              fill="#06b6d4"
            />
          </g>
        </svg>
      </div>

      {/* Down arrow button */}
      <button
        className="text-3xl font-bold select-none"
        onClick={(e) => {
          e.stopPropagation();
          handleDown();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
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
