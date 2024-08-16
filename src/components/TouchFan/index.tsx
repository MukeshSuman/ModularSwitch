import React from "react";
import "./touch-fan.css";

type TouchFanProps = {
  children?: React.ReactNode;
};

const TouchFan = ({ children }: TouchFanProps) => {
  return (
    <div className="container">
      <div className="center-elements">
        <div className="line diagonal-1"></div>
        <div className="line diagonal-2"></div>
        <div className="line diagonal-3"></div>
        <div className="circle"></div>
      </div>
      <div className="arrow arrow-up"></div>
      <div className="arrow arrow-down"></div>
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default TouchFan;
