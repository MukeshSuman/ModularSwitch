import React from "react";

export const NetworkComponent: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6"
          y="8"
          width="20"
          height="16"
          rx="2"
          stroke="#06b6d4"
          strokeWidth="1"
        />
        <rect
          x="13"
          y="16"
          width="6"
          height="4"
          rx="1"
          stroke="#06b6d4"
          strokeWidth="1"
        />
        <rect x="15" y="20" width="2" height="2" rx="0.5" fill="#38bdf8" />
      </svg>
      {/* <span className="text-lg text-gray-600 mt-2 font-semibold">RJ45</span> */}
    </div>
  );
};
