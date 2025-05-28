import React, { useState } from "react";

export const TwoWayTouchComponent: React.FC = () => {
  const [active, setActive] = useState([false, false]);

  return (
    <div className="w-full h-full flex items-center justify-center gap-8">
      {[0, 1].map((idx) => (
        <div
          key={idx}
          className={`w-[30px] h-[30px] relative cursor-pointer transition-all duration-200 flex items-center justify-center ${
            active[idx] ? "bg-cyan-400 shadow-[0_0_6px_2px_#00faff]" : ""
            
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setActive((prev) => prev.map((v, i) => (i === idx ? !v : v)));
          }}
        >
          {/* Top-left corner */}
          <div className="absolute left-0 top-0 w-[20px] h-[12px] border-t-2 border-l-2 border-cyan-500 rounded-tl-[10px]" />
          {/* Top-right corner */}
          <div className="absolute right-0 top-0 w-[12px] h-[12px] border-t-2 border-r-2 border-cyan-500 rounded-tr-[10px]" />
          {/* Bottom-left corner */}
          <div className="absolute left-0 bottom-0 w-[12px] h-[12px] border-b-2 border-l-2 border-cyan-500 rounded-bl-[10px]" />
          {/* Bottom-right corner */}
          <div className="absolute right-0 bottom-0 w-[20px] h-[12px] border-b-2 border-r-2 border-cyan-500 rounded-br-[10px]" />
        </div>
      ))}
    </div>
  );
};
