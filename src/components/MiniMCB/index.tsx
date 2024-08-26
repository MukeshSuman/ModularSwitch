import React from "react";
import "./mini-mcb.css";

type MiniMCBProps = {
    children?: React.ReactNode;
};

const MiniMCB = ({ children }: MiniMCBProps) => {
    return (
        <div className="mini-mcb-switch-container">
            <div className="mini-mcb-branding">
                <div className="mini-mcb-brand-name">ANCHOR</div>
                <div className="mini-mcb-brand-model">Uno</div>
            </div>
            <div className="mini-mcb-switch">
                <div className="mini-mcb-switch-label">ON</div>
            </div>
            <div className="mini-mcb-indicator">
                <div className="mini-mcb-circle"></div>
                <div className="mini-mcb-arrow">↓</div>
            </div>
            <div className="mini-mcb-model-number">C6</div>
        </div>
    );
};

export default MiniMCB;



