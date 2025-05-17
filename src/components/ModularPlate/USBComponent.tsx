import React, { useState } from "react";

export const USBComponent: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      onClick={() => setIsOn(prev => !prev)}
    >
      <div
        className={`w-[10px] h-[10px] rounded-full mb-1 transition-all duration-300 ${
          isOn ? "bg-red-600 shadow-md shadow-red-500" : "bg-gray-500"
        }`}
      />
      <div className="w-4 h-[50px] bg-[#222] border-2 border-gray-600 rounded-sm shadow-inner shadow-black/80" />
    </div>
  );
};
