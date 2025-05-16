import React from 'react';
import { Component } from '../types/components';

interface SocketProps {
  component: Component;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const Socket: React.FC<SocketProps> = ({ component, isSelected, onMouseDown }) => {
  return (
    <div
      className={`absolute select-none shadow-lg border border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: component.position.x, top: component.position.y, width: 90, height: 90, zIndex: 50 }}
      onMouseDown={onMouseDown}
    >
      {/* Outer plate */}
      <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-md shadow-inner border border-gray-200">
        {/* Inner border for plate effect */}
        <div className="absolute inset-1 rounded bg-gray-50 border border-gray-300" />
        {/* Top pin */}
        <div className="absolute left-1/2 top-3 -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full shadow-md" style={{boxShadow: '0 1px 2px #8888'}} />
        {/* Middle left */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full shadow" style={{boxShadow: '0 1px 2px #8888'}} />
        {/* Middle right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full shadow" style={{boxShadow: '0 1px 2px #8888'}} />
        {/* Bottom left */}
        <div className="absolute left-6 bottom-3 w-4 h-4 bg-gray-900 rounded-full shadow-md" style={{boxShadow: '0 1px 2px #8888'}} />
        {/* Bottom right */}
        <div className="absolute right-6 bottom-3 w-4 h-4 bg-gray-900 rounded-full shadow-md" style={{boxShadow: '0 1px 2px #8888'}} />
        {/* Optional indicator dot */}
        <div className="absolute right-2 top-2 w-1.5 h-1.5 bg-green-400 rounded-full opacity-70" />
      </div>
      <div className="text-xs text-gray-700 mt-2">Socket</div>
    </div>
  );
}; 