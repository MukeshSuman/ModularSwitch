import React from 'react';
import { Component } from '../types/components';

interface TouchSwitchProps {
  component: Component;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchButton: (idx: number, e: React.MouseEvent) => void;
}

export const TouchSwitch: React.FC<TouchSwitchProps> = ({ component, isSelected, onMouseDown, onTouchButton }) => {
  const buttonStates = component.buttonStates && component.buttonStates.length === 4
    ? component.buttonStates
    : [false, false, false, false];

  return (
    <div
      className={`absolute select-none shadow-lg border border-gray-200 bg-white rounded-xl flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: component.position.x, top: component.position.y, width: 96, height: 120, zIndex: 50 }}
      onMouseDown={onMouseDown}
    >
      <div className="relative w-24 h-24 bg-white rounded-xl flex flex-wrap items-center justify-center">
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx} className="w-1/2 h-1/2 flex items-center justify-center">
            {/* Touch button only, round, with on/off state */}
            <button
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                ${buttonStates[idx] ? 'border-blue-500 bg-blue-400 shadow-lg' : 'border-gray-300 bg-gray-100'}
                active:scale-95
              `}
              style={{ boxShadow: buttonStates[idx] ? '0 0 8px #60a5fa' : 'none' }}
              onClick={(e) => onTouchButton(idx, e)}
            />
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-700 mt-2">Touch Switch</div>
    </div>
  );
}; 