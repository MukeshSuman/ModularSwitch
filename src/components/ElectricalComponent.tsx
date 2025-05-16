import React, { useRef } from 'react';
import { Component as ComponentType, ComponentType as ComponentTypeEnum } from '../types/components';
import { useBoard } from '../context/BoardContext';
import { Bulb } from './Bulb';
import { TouchSwitch } from './TouchSwitch';
import { Switch as SwitchComp } from './Switch';
import { Indicator } from './Indicator';
import { Socket } from './Socket';
import { CeilingFan } from './CeilingFan';

interface Props {
  component: ComponentType;
}

const getComponentIcon = (type: ComponentTypeEnum) => {
  switch (type) {
    case 'Socket':
      return '🔌';
    case 'Switch':
      return '🔘';
    case 'TouchSwitch':
      return '👆';
    case 'Fan':
      return '💨';
    case 'Indicator':
      return '💡';
    case 'Distribution':
      return '📦';
    case 'Junction':
      return '🔗';
    case 'Light':
      return '💡';
    case 'Inverter':
      return '🔄';
    case 'Battery':
      return '🔋';
    case 'Generator':
      return '⚙️';
    case 'Changeover':
      return '🔄';
    case 'Earthing':
      return '⚡';
    case 'CableClip':
      return '📎';
    case 'Tape':
      return '🎞️';
    default:
      return '❓';
  }
};

const getComponentColor = (type: ComponentTypeEnum) => {
  switch (type) {
    case 'Socket':
    case 'Switch':
    case 'TouchSwitch':
      return 'bg-blue-500';
    case 'Fan':
    case 'Light':
      return 'bg-green-500';
    case 'Indicator':
      return 'bg-yellow-500';
    case 'Distribution':
    case 'Junction':
      return 'bg-gray-500';
    case 'Inverter':
    case 'Battery':
    case 'Generator':
      return 'bg-purple-500';
    case 'Changeover':
      return 'bg-orange-500';
    case 'Earthing':
      return 'bg-green-700';
    case 'CableClip':
    case 'Tape':
      return 'bg-gray-400';
    default:
      return 'bg-gray-500';
  }
};

export const ElectricalComponent: React.FC<Props> = ({ component }) => {
  const { state, dispatch } = useBoard();
  const isSelected = state.selectedComponent === component.id;
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_COMPONENT', payload: component.id });
    dragging.current = true;
    offset.current = {
      x: e.clientX - component.position.x,
      y: e.clientY - component.position.y,
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        ...component,
        position: {
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y,
        },
      },
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // TouchSwitch button handler
  const handleTouchButton = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const buttonStates = component.buttonStates && component.buttonStates.length === 4
      ? component.buttonStates
      : [false, false, false, false];
    const newStates = [...buttonStates];
    newStates[idx] = !newStates[idx];
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        ...component,
        buttonStates: newStates,
      },
    });
  };

  // Click handler for toggleable components
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_COMPONENT', payload: component.id });
  };

  // Use separate components for each type
  if (component.type === 'Light') {
    return <Bulb component={component} isSelected={isSelected} onMouseDown={handleMouseDown} onClick={handleToggle} />;
  }
  if (component.type === 'TouchSwitch') {
    return <TouchSwitch component={component} isSelected={isSelected} onMouseDown={handleMouseDown} onTouchButton={handleTouchButton} />;
  }
  if (component.type === 'Switch') {
    return <SwitchComp component={component} isSelected={isSelected} onMouseDown={handleMouseDown} onClick={handleToggle} />;
  }
  if (component.type === 'Indicator') {
    return <Indicator component={component} isSelected={isSelected} onMouseDown={handleMouseDown} onClick={handleToggle} />;
  }
  if (component.type === 'Socket') {
    return <Socket component={component} isSelected={isSelected} onMouseDown={handleMouseDown} />;
  }
  if (component.type === 'Fan') {
    return <CeilingFan component={component} isSelected={isSelected} onMouseDown={handleMouseDown} onClick={handleToggle} />;
  }

  // Custom UI for RCCB
  if (component.type === 'RCCB') {
    return (
      <div
        className={`absolute select-none shadow-lg border border-gray-300 bg-white rounded-lg p-2 flex flex-col items-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{ left: component.position.x, top: component.position.y, width: 90, height: 140, zIndex: 50 }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full flex justify-center items-center mb-1">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">HAVELLS</span>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded mb-1 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-700">1 &nbsp; N</span>
        </div>
        <div className="w-12 h-6 bg-gray-100 rounded flex items-center justify-center mb-1 border border-gray-400">
          <div className="w-6 h-4 bg-gray-300 rounded-t-sm flex items-center justify-center">
            <div className="w-4 h-2 bg-blue-300 rounded" />
          </div>
        </div>
        <div className="flex flex-col items-center text-[10px] text-gray-700 mb-1">
          <span>Test Regularly</span>
          <span>DP RCCB</span>
          <span>40A 30mA</span>
        </div>
        <div className="flex flex-row w-full justify-between text-[10px] text-gray-700">
          <span>2</span>
          <span>N</span>
        </div>
      </div>
    );
  }

  // Custom UI for MCB
  if (component.type === 'MCB') {
    return (
      <div
        className={`absolute select-none shadow-lg border border-gray-300 bg-white rounded-lg p-2 flex flex-col items-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{ left: component.position.x, top: component.position.y, width: 90, height: 140, zIndex: 50 }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full flex justify-center items-center mb-1">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">HAVELLS</span>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded mb-1 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-700">X7</span>
        </div>
        <div className="w-12 h-6 bg-gray-100 rounded flex items-center justify-center mb-1 border border-gray-400">
          <div className="w-6 h-4 bg-gray-700 rounded-t-sm flex items-center justify-center">
            <div className="w-4 h-2 bg-blue-900 rounded" />
          </div>
        </div>
        <div className="flex flex-col items-center text-[10px] text-gray-700 mb-1">
          <span>Miniature Circuit Breaker</span>
          <span>DP 240V</span>
        </div>
        <div className="flex flex-row w-full justify-between text-[10px] text-gray-700">
          <span>ON</span>
          <span>OFF</span>
        </div>
      </div>
    );
  }

  // Default for other types
  return (
    <div
      className={`
        absolute p-4 rounded-lg shadow-lg cursor-pointer select-none
        ${getComponentColor(component.type)}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        transition-all duration-200
        z-50
      `}
      onMouseDown={handleMouseDown}
      style={{
        left: component.position.x,
        top: component.position.y,
        minWidth: 120,
        minHeight: 80,
      }}
    >
      <div className="text-2xl mb-2">{getComponentIcon(component.type)}</div>
      <div className="text-white font-medium">{component.name}</div>
      <div className="text-white text-sm opacity-75">{component.type}</div>
      {['Switch', 'TouchSwitch', 'Fan', 'Light'].includes(component.type) && (
        <button
          className={`
            mt-2 px-2 py-1 rounded text-sm
            ${component.status === 'on' ? 'bg-green-600' : 'bg-red-600'}
            text-white
          `}
          onClick={handleToggle}
        >
          {component.status === 'on' ? 'ON' : 'OFF'}
        </button>
      )}
    </div>
  );
}; 