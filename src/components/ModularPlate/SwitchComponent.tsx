import React, { useState } from "react";

export const SwitchComponent: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={`w-[95%] h-[95%] rounded-xl border-2 ${
        isOn ? "" : "border-gray-300"
      } bg-gradient-to-b from-white to-gray-200 shadow-lg flex items-end justify-center pb-1.5 cursor-pointer transition-all duration-300`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`w-[10px] h-[28px] rounded-sm transition-all duration-300 ${
          isOn
            ? "bg-red-600 shadow-md shadow-red-500"
            : "bg-gray-500"
        }`}
      />
    </div>
  );
};
