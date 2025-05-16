import React, { useState } from 'react';
import { useBoard } from '../context/BoardContext';
import { ElectricalComponent } from './ElectricalComponent';
import { Component as ComponentType, ComponentType as ComponentTypeEnum } from '../types/components';

const COMPONENT_TYPES: ComponentTypeEnum[] = [
  'MCB',
  'RCCB',
  'Socket',
  'Switch',
  'TouchSwitch',
  'Fan',
  'Indicator',
  'Distribution',
  'Junction',
  'Light',
  'Inverter',
  'Battery',
  'Generator',
  'Changeover',
  'Earthing',
  'CableClip',
  'Tape',
];

export const Board: React.FC = () => {
  const { state, dispatch } = useBoard();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !state.selectedComponent) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    const component = state.components.find(c => c.id === state.selectedComponent);
    if (component) {
      dispatch({
        type: 'UPDATE_COMPONENT',
        payload: {
          ...component,
          position: {
            x: component.position.x + dx,
            y: component.position.y + dy,
          },
        },
      });
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleAddComponent = (type: ComponentTypeEnum) => {
    const newComponent: ComponentType = {
      id: `${type}-${Date.now()}`,
      type,
      name: `${type} ${state.components.filter(c => c.type === type).length + 1}`,
      position: { x: 100, y: 100 },
      connections: [],
      status: 'off',
    };

    dispatch({ type: 'ADD_COMPONENT', payload: newComponent });
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Components</h2>
        <div className="grid grid-cols-2 gap-2">
          {COMPONENT_TYPES.map((type) => (
            <button
              key={type}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleAddComponent(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Debug: Show number of components */}
      <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow text-xs">
        Components in state: {state.components.length}
      </div>

      <div
        className="absolute inset-0 border-4 border-dashed border-red-400"
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {state.components.map((component) => (
          <ElectricalComponent key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}; 