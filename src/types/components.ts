export type ComponentType =
  | 'MCB'
  | 'RCCB'
  | 'Socket'
  | 'Switch'
  | 'TouchSwitch'
  | 'Fan'
  | 'Indicator'
  | 'Distribution'
  | 'Junction'
  | 'Light'
  | 'Inverter'
  | 'Battery'
  | 'Generator'
  | 'Changeover'
  | 'Earthing'
  | 'CableClip'
  | 'Tape';

export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  position: {
    x: number;
    y: number;
  };
  connections: string[]; // IDs of connected components
  status: 'on' | 'off' | 'neutral';
  rating?: string; // For components like MCB, RCCB
  current?: number; // Current flow in amperes
  voltage?: number; // Voltage in volts
  buttonStates?: boolean[]; // For TouchSwitch: state of each button
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'live' | 'neutral' | 'earth';
  status: 'active' | 'inactive';
} 