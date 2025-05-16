import { ItemType, BaseComponentProps } from '../types';
import Indicator from '../components/Indicator';
import Socket from "../components/Socket";
import MiniMCB from "../components/MiniMCB";
import Touch4Switch from "../components/Touch4Switch";
import Touch2Switch from "../components/Touch2Switch";
import TouchFan from "../components/TouchFan";
import Switch from "../components/Switch";
import Switch2 from "../components/Switch2";

// Electrical component types
export type ComponentType = 
  | 'MCB'           // Miniature Circuit Breaker
  | 'RCCB'          // Residual Current Circuit Breaker
  | 'Socket'        // Power Socket
  | 'Switch'        // Basic Switch
  | 'TouchSwitch'   // Touch Switch
  | 'Fan'           // Fan Control
  | 'Indicator'     // Power Indicator
  | 'Distribution'  // Distribution Board
  | 'Junction'      // Junction Box
  | 'Light'         // Light Fixture
  | 'Inverter'      // Power Inverter
  | 'Battery'       // Inverter Battery
  | 'Generator'     // Generator Input
  | 'Changeover'    // Changeover Switch
  | 'Earthing'      // Earthing Rod
  | 'CableClip'     // Cable Clips/Ties
  | 'Tape';         // Electrical Tape

// Component ratings and specifications
export interface ComponentSpecs {
  voltage?: number;      // Voltage rating (V)
  current?: number;      // Current rating (A)
  power?: number;        // Power rating (W)
  type?: ComponentType;  // Component type
  phase?: 'single' | 'three'; // Phase type
  protection?: string[]; // Protection features
}

export const modularItems: ItemType[] = [
    { 
        id: 1, 
        size: 'half', 
        label: 'Power Indicator', 
        name: 'Indicator', 
        component: Indicator as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 0.1,
            type: 'Indicator',
            phase: 'single'
        }
    },
    { 
        id: 2, 
        size: 'half', 
        label: 'MCB 16A', 
        name: 'MiniMCB', 
        component: MiniMCB as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 16,
            type: 'MCB',
            phase: 'single',
            protection: ['Overcurrent', 'Short Circuit']
        }
    },
    { 
        id: 3, 
        size: 'full', 
        label: 'Power Socket', 
        name: 'Socket', 
        component: Socket as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 13,
            power: 3000,
            type: 'Socket',
            phase: 'single'
        }
    },
    { 
        id: 4, 
        size: 'full', 
        label: '4-Gang Touch Switch', 
        name: 'Touch4Switch', 
        component: Touch4Switch as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 10,
            type: 'TouchSwitch',
            phase: 'single'
        }
    },
    { 
        id: 5, 
        size: 'full', 
        label: '2-Gang Touch Switch', 
        name: 'Touch2Switch', 
        component: Touch2Switch as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 10,
            type: 'TouchSwitch',
            phase: 'single'
        }
    },
    { 
        id: 6, 
        size: 'full', 
        label: 'Fan Control', 
        name: 'TouchFan', 
        component: TouchFan as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 5,
            type: 'Fan',
            phase: 'single'
        }
    },
    { 
        id: 7, 
        size: 'half', 
        label: 'Basic Switch', 
        name: 'Switch', 
        component: Switch as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 10,
            type: 'Switch',
            phase: 'single'
        }
    },
    { 
        id: 8, 
        size: 'half', 
        label: 'Basic Switch 2', 
        name: 'Switch2', 
        component: Switch2 as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 10,
            type: 'Switch',
            phase: 'single'
        }
    },
    { 
        id: 9, 
        size: 'half', 
        label: 'RCCB 32A', 
        name: 'RCCB', 
        component: MiniMCB as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 32,
            type: 'RCCB',
            phase: 'single',
            protection: ['Earth Leakage', 'Overcurrent']
        }
    },
    { 
        id: 10, 
        size: 'full', 
        label: 'Distribution Board', 
        name: 'Distribution', 
        component: MiniMCB as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 63,
            type: 'Distribution',
            phase: 'single',
            protection: ['Multiple Circuits']
        }
    },
    { 
        id: 11, 
        size: 'half', 
        label: 'Junction Box', 
        name: 'Junction', 
        component: MiniMCB as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 20,
            type: 'Junction',
            phase: 'single'
        }
    },
    { 
        id: 12, 
        size: 'half', 
        label: 'Light Fixture', 
        name: 'Light', 
        component: Switch as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 1,
            power: 100,
            type: 'Light',
            phase: 'single'
        }
    },
    { 
        id: 13, 
        size: 'full', 
        label: 'Inverter', 
        name: 'Inverter', 
        component: MiniMCB as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 20,
            power: 1500,
            type: 'Inverter',
            phase: 'single'
        }
    },
    { 
        id: 14, 
        size: 'full', 
        label: 'Battery', 
        name: 'Battery', 
        component: MiniMCB as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 12,
            current: 100,
            type: 'Battery',
            phase: 'single'
        }
    },
    { 
        id: 15, 
        size: 'half', 
        label: 'Generator Input', 
        name: 'Generator', 
        component: Socket as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 32,
            type: 'Generator',
            phase: 'single'
        }
    },
    { 
        id: 16, 
        size: 'half', 
        label: 'Changeover Switch', 
        name: 'Changeover', 
        component: Switch as React.ComponentType<BaseComponentProps>,
        specs: {
            voltage: 230,
            current: 32,
            type: 'Changeover',
            phase: 'single'
        }
    }
];

// Circuit configuration types
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

// Default circuit configurations
export const defaultCircuits = [
    {
        id: 'main',
        name: 'Main Circuit',
        components: ['2'], // MCB
        rating: {
            voltage: 230,
            current: 63
        },
        protection: ['Overcurrent', 'Short Circuit']
    },
    {
        id: 'lighting',
        name: 'Lighting Circuit',
        components: ['7', '8'], // Basic Switches
        rating: {
            voltage: 230,
            current: 6
        },
        protection: ['Overcurrent']
    },
    {
        id: 'power',
        name: 'Power Circuit',
        components: ['3'], // Socket
        rating: {
            voltage: 230,
            current: 16
        },
        protection: ['Overcurrent', 'RCCB']
    }
];