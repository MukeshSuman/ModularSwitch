import React, { useState } from "react";
import "./touch-4-switch.css";

type TouchSwitchProps = {
  children?: React.ReactNode;
  label?: string; 
};

const TouchSwitch = ({ children, label }: TouchSwitchProps) => {
  const [list, setList] = useState([
    {
      id: 1,
      name: "TouchSwitch",
      color: "red",
      isOn: false,
      positon: "tl",
    },
    {
      id: 2,
      name: "TouchSwitch",
      color: "blue",
      isOn: false,
      positon: "tr",
    },
    {
      id: 3,
      name: "TouchSwitch",
      color: "green",
      isOn: false,
      positon: "bl",
    },
    {
      id: 4,
      name: "TouchSwitch",
      color: "green",
      isOn: false,
      positon: "br",
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
    <div className="ts-container">
      {list.map((item) => (
        <div
          className={`ts-square ts-${item.positon} ${item.isOn ? "ts-on" : ""}`}
          onClick={() => switchOnOff(item.id)}
        ></div>
      ))}
      <div className="ts-child">
        {!children && label ? label: null}
        {children && !label ? children: null}
        {children && label ? label: null}
      </div>
    </div>
  );
};

export default TouchSwitch;
