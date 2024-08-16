import React from "react";
import Module from "../Module";
import Socket from "../Socket";
import Switch from "../Switch";
import TouchFan from "../TouchFan";
import TouchSwitch from "../TouchSwitch";
import Touch2Switch from "../Touch2Switch";

import "./modular-switch-box.css";

type ModularSwitchBoxrops = {
  children?: React.ReactNode;
};

const ModularSwitchBox = ({ children }: ModularSwitchBoxrops) => {
  // 4, 6, 8, 12, 16, 20
  const ModuleCount = 8;
  //  horizontal and vertical
  const ModuleType = "horizontal";

  const list = [...Array(ModuleCount / 2).keys()];

  const groups = [
    {
      child: [
        {
          items: ["Switch", "Switch"],
        },
        {
          items: ["Touch2Switch"],
        },
      ],
    },
    {
      child: [
        {
          items: ["Socket"],
        },
      ],
    },
    {
      child: [
        {
          items: ["TouchSwitch"],
        },
      ],
    },
  ];

  const ModularItem = ({ item }: any) => {
    return (
      <Module>
        {item.items.map((item3: any, index1: number) => (
          <>
            {item3 === "Switch" && <Switch />}
            {item3 === "Socket" && <Socket />}
            {item3 === "TouchFan" && <TouchFan />}
            {item3 === "TouchSwitch" && <TouchSwitch />}
            {item3 === "Touch2Switch" && <Touch2Switch />}
          </>
        ))}
      </Module>
    );
  };

  const ModularBox = ({ item }: any) => {
    return item.child.map((child: any) => (
      <div className="modular-switch-box">
        <ModularItem item={child} />
      </div>
    ));
  };

  return (
    <div className="modular-container">
      <div className="modular-switch-box">
        <Module>
          <TouchSwitch />
        </Module>
        <Module>
          <Touch2Switch />
        </Module>
        <Module>
          <TouchSwitch />
        </Module>
      </div>
      <div className="modular-switch-box">
        <Module>
          <Switch />
          <Switch />
        </Module>
        <Module>
          <Socket />
        </Module>
        <Module>
          <TouchFan />
        </Module>
      </div>
    </div>
  );
};

export default ModularSwitchBox;
