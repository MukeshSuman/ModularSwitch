import React, { useState } from "react";

export const FanRegulatorComponent: React.FC = () => {
  const [level, setLevel] = useState(0);
  const maxLevel = 3;

  // Angles for each level: top, right, bottom, left
  const angleMap = [-90, 0, 90, 180];
  const radius = 28;

  const handleClick = () => {
    setLevel((prev) => (prev < maxLevel ? prev + 1 : 0));
  };

  return (
    <div
      className="relative w-[80px] h-[80px] flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Outer indicator dots (fixed) */}
      {angleMap.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 40 + radius * Math.cos(rad);
        const y = 40 + radius * Math.sin(rad);
        return (
          <div
            key={i}
            className={`absolute w-[6px] h-[6px] rounded-full transition-colors duration-300 ${
              level > i  ? "bg-cyan-400 shadow-[0_0_6px_2px_#00faff]" : "bg-gray-400"
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Rotating knob with pointer fixed visually at top */}
      <div
        className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-md relative flex items-center justify-center transition-transform duration-300"
        style={{
          transform: `rotate(${angleMap[level]}deg)`,
        }}
      >
        {/* Top pointer (rotates with knob) */}
        <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-cyan-400 shadow-[0_0_6px_2px_#00faff] rounded-full" />
      </div>
    </div>
  );
};
