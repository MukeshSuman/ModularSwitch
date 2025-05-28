import React from "react";

export const TVSocketComponent: React.FC = () => {
  return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* Circular socket */}
        <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="#06b6d4" strokeWidth="2.5"/>
          <circle cx="16" cy="16" r="3" fill="#06b6d4"/>
        </svg>
      </div>
  );
};
