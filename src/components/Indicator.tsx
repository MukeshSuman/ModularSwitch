import React from 'react';
import { Component } from '../types/components';

interface IndicatorProps {
  component: Component;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

export const Indicator: React.FC<IndicatorProps> = ({ component, isSelected, onMouseDown, onClick }) => {
  const isOn = component.status === 'on';
  return (
    <div
      className={`absolute select-none shadow-lg border border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: component.position.x, top: component.position.y, width: 48, height: 96, zIndex: 50 }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className="flex-1 flex items-center justify-center w-full">
        <div
          className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-200
            ${isOn ? 'border-red-500 bg-red-200 shadow-indicator' : 'border-gray-300 bg-gray-100'}
          `}
          style={{ boxShadow: isOn ? '0 0 12px 2px #ef4444' : 'none' }}
        >
          <div className={`w-4 h-4 rounded-full ${isOn ? 'bg-red-500' : 'bg-gray-300'}`} />
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mb-1">Indicator</div>
    </div>
  );
}; 