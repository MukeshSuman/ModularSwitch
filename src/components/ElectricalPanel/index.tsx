import React, { useState, useEffect } from 'react';
import { Circuit, CircuitState, ComponentState, WiringConnection } from '../../types';
import { modularItems, defaultCircuits } from '../../constants';
import './electrical-panel.css';

const ElectricalPanel: React.FC = () => {
  const [circuits, setCircuits] = useState<Circuit[]>(defaultCircuits);
  const [circuitStates, setCircuitStates] = useState<Record<string, CircuitState>>({});
  const [componentStates, setComponentStates] = useState<Record<string, ComponentState>>({});
  const [connections, setConnections] = useState<WiringConnection[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);

  // Initialize circuit states
  useEffect(() => {
    const initialCircuitStates: Record<string, CircuitState> = {};
    const initialComponentStates: Record<string, ComponentState> = {};

    circuits.forEach(circuit => {
      initialCircuitStates[circuit.id] = {
        isActive: true,
        current: circuit.rating.current,
        voltage: circuit.rating.voltage,
        power: circuit.rating.voltage * circuit.rating.current,
        lastUpdated: new Date()
      };

      circuit.components.forEach(componentId => {
        const component = modularItems.find(item => item.id.toString() === componentId);
        if (component) {
          initialComponentStates[componentId] = {
            id: componentId,
            type: component.specs.type,
            isOn: false,
            current: 0,
            voltage: component.specs.voltage,
            power: 0,
            lastUpdated: new Date()
          };
        }
      });
    });

    setCircuitStates(initialCircuitStates);
    setComponentStates(initialComponentStates);
  }, [circuits]);

  // Update circuit states periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCircuitStates(prevStates => {
        const newStates = { ...prevStates };
        Object.keys(newStates).forEach(circuitId => {
          const circuit = circuits.find(c => c.id === circuitId);
          if (circuit) {
            const totalCurrent = circuit.components.reduce((sum, compId) => {
              const compState = componentStates[compId];
              return sum + (compState?.current || 0);
            }, 0);

            newStates[circuitId] = {
              ...newStates[circuitId],
              current: totalCurrent,
              power: totalCurrent * newStates[circuitId].voltage,
              lastUpdated: new Date()
            };
          }
        });
        return newStates;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [circuits, componentStates]);

  const handleComponentToggle = (componentId: string) => {
    setComponentStates(prevStates => {
      const newStates = { ...prevStates };
      const component = newStates[componentId];
      if (component) {
        const isOn = !component.isOn;
        newStates[componentId] = {
          ...component,
          isOn,
          current: isOn ? (component.voltage * 0.1) : 0,
          power: isOn ? (component.voltage * component.current) : 0,
          lastUpdated: new Date()
        };
      }
      return newStates;
    });
  };

  const handleComponentFault = (componentId: string, isFaulty: boolean) => {
    setComponentStates(prevStates => {
      const newStates = { ...prevStates };
      const component = newStates[componentId];
      if (component) {
        newStates[componentId] = {
          ...component,
          isFaulty,
          lastUpdated: new Date()
        };
      }
      return newStates;
    });
  };

  const handleAddComponent = (circuitId: string, componentType: string) => {
    const component = modularItems.find(item => item.name === componentType);
    if (!component) return;

    setCircuits(prevCircuits => {
      return prevCircuits.map(circuit => {
        if (circuit.id === circuitId) {
          return {
            ...circuit,
            components: [...circuit.components, component.id.toString()]
          };
        }
        return circuit;
      });
    });
  };

  const handleRemoveComponent = (circuitId: string, componentId: string) => {
    setCircuits(prevCircuits => {
      return prevCircuits.map(circuit => {
        if (circuit.id === circuitId) {
          return {
            ...circuit,
            components: circuit.components.filter(id => id !== componentId)
          };
        }
        return circuit;
      });
    });
  };

  return (
    <div className="electrical-panel">
      <div className="circuit-status">
        {Object.entries(circuitStates).map(([circuitId, state]) => (
          <div key={circuitId} className="circuit-info">
            <h3>Circuit: {circuitId}</h3>
            <p>Voltage: {state.voltage}V</p>
            <p>Current: {state.current.toFixed(2)}A</p>
            <p>Power: {state.power.toFixed(2)}W</p>
            <p>Status: {state.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
      <div className="circuit-grid">
        {circuits.map(circuit => (
          <div key={circuit.id} className="circuit-group">
            <h2>{circuit.name}</h2>
            <div className="circuit-components">
              {circuit.components.map(componentId => {
                const component = modularItems.find(item => item.id.toString() === componentId);
                if (!component) return null;
                const Component = component.component;
                const state = componentStates[componentId];
                
                return (
                  <div key={componentId} className="component-wrapper">
                    <Component
                      id={componentId}
                      isOn={state?.isOn || false}
                      onToggle={() => handleComponentToggle(componentId)}
                      specs={component.specs}
                      label={component.label}
                      onFault={(isFaulty) => handleComponentFault(componentId, isFaulty)}
                    />
                    <button 
                      className="remove-component"
                      onClick={() => handleRemoveComponent(circuit.id, componentId)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="add-component">
              <select 
                onChange={(e) => handleAddComponent(circuit.id, e.target.value)}
                value=""
              >
                <option value="">Add Component...</option>
                {modularItems.map(item => (
                  <option key={item.id} value={item.name}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectricalPanel; 