import React, { useState } from "react";

export const TouchComponent: React.FC = () => {
  const [activeCorners, setActiveCorners] = useState<string[]>([]);

  const toggleCorner = (corner: string) => {
    setActiveCorners((prev) =>
      prev.includes(corner)
        ? prev.filter((c) => c !== corner)
        : [...prev, corner]
    );
  };

  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];

  return (
    <div className="w-full h-full bg-[#f4f4f4] rounded-xl relative">
      {corners.map((corner) => (
        <div
          key={corner}
          className={`absolute w-[20px] h-[20px] rounded-full border-[2px] border-gray-500 cursor-pointer 
            ${corner} ${activeCorners.includes(corner) ? "bg-cyan-400 shadow-[0_0_6px_2px_#00faff]" : "bg-slate-400 border-slate-700"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCorner(corner);
          }}
          style={{
            ...(corner === "top-left" && { top: "10px", left: "10px" }),
            ...(corner === "top-right" && { top: "10px", right: "10px" }),
            ...(corner === "bottom-left" && { bottom: "10px", left: "10px" }),
            ...(corner === "bottom-right" && { bottom: "10px", right: "10px" }),
          }}
        ></div>
      ))}
    </div>
  );
};
