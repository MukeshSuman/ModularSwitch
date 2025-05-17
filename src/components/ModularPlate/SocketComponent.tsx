import React from "react";

export const SocketComponent: React.FC = () => {
  const holeStyle: React.CSSProperties = {
    width: "25px",
    height: "25px",
    background: "#000",
    borderRadius: "50%",
    position: "absolute"
  };

  const holes = [
    { top: "16%", left: "calc(50% - 12.5px)" },
    { top: "40%", left: "16%" },
    { top: "40%", right: "16%" },
    { bottom: "20%", left: "20%" },
    { bottom: "20%", right: "20%" }
  ];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {holes.map((pos, index) => (
        <div
          key={index}
          style={{ ...holeStyle, ...pos }}
        />
      ))}
    </div>
  );
};
