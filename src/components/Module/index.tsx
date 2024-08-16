import React from "react";

import "./module.css";

type ModuleProps = {
  children?: React.ReactNode;
};

const Module = (props: ModuleProps) => {
  return <div className="module">{props.children ? props.children : null}</div>;
};

export default Module;
