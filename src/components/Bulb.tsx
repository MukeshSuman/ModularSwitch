import React from 'react';
import { Component } from '../types/components';

interface BulbProps {
  component: Component;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

export const Bulb: React.FC<BulbProps> = ({ component, isSelected, onMouseDown, onClick }) => {
  const isOn = component.status === 'on';
  return (
    <div
      className={`absolute select-none flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: component.position.x, top: component.position.y, zIndex: 50 }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Bulb base (now at top) */}
        <div className="w-8 h-5 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-lg mb-[-10px] border-b-2 border-gray-600 flex items-end justify-center">
          <div className="w-3 h-1.5 bg-gray-900 rounded-b" />
        </div>
        {/* Bulb top (now at bottom) */}
        <div
          className={`w-16 h-16 rounded-full transition-all duration-200 flex items-center justify-center mt-1
            ${isOn ? 'bg-gradient-to-b from-yellow-400 to-yellow-200 shadow-bulb-on' : 'bg-gradient-to-b from-gray-400 to-gray-200 shadow-bulb-off'}`}
          style={{
            boxShadow: isOn ? '0 0 30px 10px #fbbf24, 0 0 70px 15px #ffedd5' : '0 0 10px 3px #9ca3af',
          }}
        >
          <div className={`w-10 h-10 rounded-full ${isOn ? 'bg-yellow-300' : 'bg-gray-300'}`} />
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mb-1">Bulb</div>
    </div>
  );
}; 