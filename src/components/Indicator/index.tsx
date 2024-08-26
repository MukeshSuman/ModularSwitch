import React from "react";
import "./indicator.css";

type IndicatorProps = {
    children?: React.ReactNode;
};

const Indicator = ({ children }: IndicatorProps) => {
    return (
        <div className="indicator-container">
            <div className="indicator-circle">
                <div className="indicator-inner-circle"></div>
            </div>
        </div>

    );
};

export default Indicator;
