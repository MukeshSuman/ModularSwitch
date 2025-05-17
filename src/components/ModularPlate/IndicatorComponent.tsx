import React, { useState } from "react";

export const IndicatorComponent: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={`w-9 h-9 rounded-full border-[6px] bg-white cursor-pointer ${
        isOn
          ? "border-red-600 shadow-[0_0_10px_#e60000] shadow-inner"
          : "border-gray-300"
      }`}
      onClick={() => {
        setIsOn(!isOn);
      }}
    />
  );
};
