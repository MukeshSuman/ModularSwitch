import React, { useState } from "react";
import "./touch-2-switch.css";
type Touch2SwitchProps = {
  children?: React.ReactNode;
};

const Touch2Switch = ({ children }: Touch2SwitchProps) => {
  const [list, setList] = useState([
    {
      id: 1,
      name: "Touch2Switch",
      isOn: false,
    },
    {
      id: 2,
      name: "Touch2Switch",
      isOn: false,
    },
  ]);

  const switchOnOff = (id: number) => {
    const tempList = list.map((item) => {
      if (item.id === id) {
        item.isOn = !item.isOn;
      }
      return item;
    });

    setList(tempList);
  };

  return (
    <div className="container">
      {list.map((item) => (
        <div
          className={`square ${item.isOn ? "t2s-on" : ""}`}
          onClick={() => switchOnOff(item.id)}
        ></div>
      ))}
      {/* <div className="square"></div> */}
      {/* <div className="square"></div> */}
    </div>
  );
};

export default Touch2Switch;
