import React from "react";
import Module from "../Module";
import Socket from "../Socket";
import Switch from "../Switch";
import TouchFan from "../TouchFan";
import Touch4Switch from "../Touch4Switch";
import Touch2Switch from "../Touch2Switch";
import Switch2 from "../Switch2";
import MiniMCB from "../MiniMCB";



import "./modular-switch-box.css";
import Indicator from "../Indicator";
import Grid from "../Grid";
import TailwindModalBoxSystem from "../Text";

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
          items: ["Touch4Switch"],
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
            {item3 === "Touch4Switch" && <Touch4Switch />}
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
      {/* <Grid /> */}
      {/* <div className="modular-switch-box">
        <Module>
          <MiniMCB />
          <Indicator />
        </Module>
        <Module>
          <Touch2Switch />
        </Module>
        <Module>
          <Touch4Switch label="Ceiling Lights" />
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
      </div> */}
      <TailwindModalBoxSystem />
    </div>
  );
};

export default ModularSwitchBox;
