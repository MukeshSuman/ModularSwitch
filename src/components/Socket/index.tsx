import React from "react";
import "./socket.css";

type SocketProps = {
  children?: React.ReactChild;
};

const Socket = ({ children }: SocketProps) => {
  return (
    <div className="socket-container">
      <div className="socket-center-circle"></div>
      <span className="socket-label">6AMP</span>
      <div className="socket-bottom-circles">
        <div className="socket-bottom-circle"></div>
        <div className="socket-bottom-circle"></div>
      </div>
    </div>
  );
};

export default Socket;
