import React from 'react';
import { Component } from '../types/components';

interface SwitchProps {
  component: Component;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

export const Switch: React.FC<SwitchProps> = ({ component, isSelected, onMouseDown, onClick }) => {
  const isOn = component.status === 'on';
  return (
    <div
      className={`absolute select-none shadow-lg border border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: component.position.x, top: component.position.y, width: 48, height: 96, zIndex: 50 }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className={`w-9/12 h-5/6 rounded-md flex flex-col justify-end items-center transition-all duration-200
        ${isOn ? 'bg-blue-400 shadow-lg' : 'bg-gray-200 shadow'}
        ${isOn ? 'translate-y-0' : 'translate-y-1'}
      `}>
        <div className={`w-1 h-4 mb-1 rounded bg-gray-500 ${isOn ? 'bg-blue-700' : 'bg-gray-400'}`} />
      </div>
      <div className="text-[10px] text-gray-500 mt-1">Switch</div>
    </div>
  );
}; 