import React from "react";
import "./switch2.css";

type Switch2Props = {
  children?: React.ReactNode;
};

const Switch2 = ({ children }: Switch2Props) => {
  return (
    <div className="sp-switch">
      <div className="sp-circle"></div>
      <div className="sp-line"></div>
      <div className="sp-indicator"></div>
    </div>
  );
};

export default Switch2;
