import React, { useState } from "react";

export const FourGangTouchComponent: React.FC = () => {
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
    <div className="w-full h-full rounded-xl relative">
      {corners.map((corner) => (
        <div
          key={corner}
          className={`absolute w-[25px] h-[25px] rounded-md border-[2px] border-cyan-500 cursor-pointer 
            ${corner} ${activeCorners.includes(corner) ? "bg-cyan-400 shadow-[0_0_6px_2px_#00faff]" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCorner(corner);
          }}
          style={{
            ...(corner === "top-left" && { top: "15px", left: "15px" }),
            ...(corner === "top-right" && { top: "15px", right: "15px" }),
            ...(corner === "bottom-left" && { bottom: "15px", left: "15px" }),
            ...(corner === "bottom-right" && { bottom: "15px", right: "15px" }),
          }}
        ></div>
      ))}
    </div>
  );
};
