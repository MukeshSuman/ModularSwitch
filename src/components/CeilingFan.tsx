import React from 'react';
import { Component } from '../types/components';

interface CeilingFanProps {
  component: Component;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

export const CeilingFan: React.FC<CeilingFanProps> = ({ component, isSelected, onMouseDown, onClick }) => {
  const isOn = component.status === 'on';
  return (
    <div
      className={`absolute select-none shadow-lg border border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: component.position.x, top: component.position.y, width: 140, height: 140, zIndex: 50 }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {/* Hanging rod */}
      <div className="w-2 h-10 bg-gray-400 rounded-full mb-[-10px]" />
      {/* Fan body and blades (spin as a unit) */}
      <div className={`relative flex items-center justify-center ${isOn ? 'fan-spin' : ''}`} style={{ width: 90, height: 90 }}>
        {/* Blades */}
        <div
          className="absolute left-1/2 top-1/2 w-2 h-32 bg-gray-400 rounded-full origin-bottom"
          style={{ transform: 'translate(-50%, -100%) rotate(0deg)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-2 h-32 bg-gray-400 rounded-full origin-bottom"
          style={{ transform: 'translate(-50%, -100%) rotate(120deg)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-2 h-32 bg-gray-400 rounded-full origin-bottom"
          style={{ transform: 'translate(-50%, -100%) rotate(240deg)' }}
        />
        {/* Central hub */}
        <div className="absolute left-1/2 top-1/2 w-10 h-10 bg-gray-500 rounded-full border-4 border-gray-300" style={{ transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className="text-[10px] text-gray-500 mt-1">Ceiling Fan</div>
      <style>{`
        @keyframes fan-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .fan-spin {
          animation: fan-spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
}; 