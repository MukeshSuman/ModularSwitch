import React, { useState } from "react";
import { Bell } from "lucide-react"; // optional SVG icon lib

export const DoorBellTouchComponent: React.FC = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className="w-full h-full rounded-xl flex items-center justify-center shadow-inner cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setPressed(true);
        setTimeout(() => setPressed(false), 300);
      }}
    >
      <div
        className={`transition-all duration-200 ${
          pressed ? "scale-90" : "scale-100"
        }`}
      >
        {/* Use emoji or icon */}
        {/* Option 1: Bell Emoji */}
        {/* <div className="text-cyan-400 text-4xl">🔔</div> */}

        {/* Option 2: SVG Icon */}
        <Bell
          size={36}
          strokeWidth={2}
          className="text-cyan-400"
        />
      </div>
    </div>
  );
};
