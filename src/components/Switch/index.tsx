import React from "react";
import "./switch.css";

type SwitchProps = {
  children?: React.ReactNode;
};

const Switch = ({ children }: SwitchProps) => {
  return (
    <div className="switch-box">
      <div className="outer-box">
        <div className="inner-box s-up"></div>
        <div className="inner-box s-up"></div>
      </div>
    </div>
  );
};

export default Switch;
