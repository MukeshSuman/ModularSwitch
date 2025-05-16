import React from 'react';
import { ComponentType as ComponentTypeBase } from '../constants';
import { BaseComponent } from '../components/BaseComponent';

// Base component props
export interface BaseComponentProps {
  id: string;
  isOn: boolean;
  onToggle: () => void;
  specs: ComponentSpecs;
  label?: string;
  onFault?: (isFaulty: boolean) => void;
}

// Base component state
export interface BaseComponentState {
  id: string;
  type: ComponentTypeBase;
  isOn: boolean;
  current: number;
  voltage: number;
  power: number;
  lastUpdated: Date;
  isFaulty?: boolean;
}

// Electrical component specifications
export interface ComponentSpecs {
  voltage: number;      // Voltage rating (V)
  current: number;      // Current rating (A)
  power?: number;       // Power rating (W)
  type: ComponentTypeBase;  // Component type
  phase?: 'single' | 'three'; // Phase type
  protection?: string[]; // Protection features
}

// Component state
export interface ComponentState extends BaseComponentState {}

// Circuit state
export interface CircuitState {
  isActive: boolean;
  current: number;
  voltage: number;
  power: number;
  lastUpdated: Date;
}

// Circuit configuration
export interface Circuit {
  id: string;
  name: string;
  components: string[];  // Array of component IDs
  rating: {
    voltage: number;
    current: number;
  };
  protection: string[];
}

// Wiring connection
export interface WiringConnection {
  from: string;
  to: string;
  type: 'live' | 'neutral' | 'earth';
  status: 'connected' | 'disconnected' | 'faulty';
}

// Circuit diagram
export interface CircuitDiagram {
  id: string;
  name: string;
  components: ComponentState[];
  connections: WiringConnection[];
  state: CircuitState;
}

// Item type for modular components
export interface ItemType {
  id: number;
  size: 'half' | 'full';
  label: string;
  name: string;
  component: React.ComponentType<BaseComponentProps>;
  specs: ComponentSpecs;
} 