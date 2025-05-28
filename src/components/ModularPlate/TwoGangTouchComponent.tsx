import React, { useState } from "react";

export const TwoGangTouchComponent: React.FC = () => {
  const [activeCorners, setActiveCorners] = useState<string[]>([]);

  const toggleCorner = (corner: string) => {
    setActiveCorners((prev) =>
      prev.includes(corner)
        ? prev.filter((c) => c !== corner)
        : [...prev, corner]
    );
  };

  const corners = ["left-center", "right-center"];

  return (
    <div className="w-full h-full rounded-xl relative">
      {corners.map((corner) => (
        <div
          key={corner}
          className={`absolute w-[30px] h-[30px] rounded-md border-[2px] border-cyan-500 cursor-pointer 
            ${corner} ${activeCorners.includes(corner) ? "bg-cyan-400 shadow-[0_0_6px_2px_#00faff]" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCorner(corner);
          }}
          style={{
            ...(corner === "left-center" && { left: "15px", top: "50%", transform: "translateY(-50%)" }),
            ...(corner === "right-center" && { right: "15px", top: "50%", transform: "translateY(-50%)" }),
          }}
        ></div>
      ))}
    </div>
  );
};
