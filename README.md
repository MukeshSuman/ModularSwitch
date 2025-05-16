# Modular Switch Box System

A modern, extensible React-based system for simulating and managing modular electrical switch boxes and panels for house wiring. This project models real-world electrical components (MCB, RCCB, sockets, switches, touch switches, fan control, etc.) with a focus on modularity, type safety, and UI clarity.

## Features

- **Rich Component Library:**
  - Miniature Circuit Breaker (MCB)
  - Residual Current Circuit Breaker (RCCB)
  - Power Sockets
  - Basic and Touch Switches (2/4 gang)
  - Fan Control
  - Power Indicator
  - Distribution Board, Junction Box, Light Fixture, Inverter, Battery, Generator Input, Changeover Switch, and more
- **Type-Safe Architecture:**
  - All components are strongly typed using TypeScript interfaces
  - Each component has detailed specifications (voltage, current, power, type, phase, protection)
- **Modular & Extensible:**
  - Add, remove, and configure components in panels and circuits
  - Easily extend with new component types
- **Interactive UI:**
  - Visual panel and circuit layout
  - Real-time status, toggling, and fault simulation
  - Responsive and touch-friendly design

## Project Structure

- `src/constants/index.ts` — Defines all available modular items and their specifications
- `src/types/index.ts` — TypeScript interfaces for all core types (ItemType, ComponentSpecs, BaseComponentProps, etc.)
- `src/components/` — All React components for electrical modules and UI
- `src/components/ElectricalPanel/` — Main panel UI and logic
- `src/components/ModularSwitchBox/` — Modular switch box UI and logic

## Type Safety & Extensibility

Each electrical component is defined as an `ItemType`:

```ts
export interface ItemType {
  id: number;
  size: "half" | "full";
  label: string;
  name: string;
  component: React.ComponentType<BaseComponentProps>;
  specs: ComponentSpecs;
}
```

Component specifications are detailed in `ComponentSpecs`:

```ts
export interface ComponentSpecs {
  voltage: number;
  current: number;
  power?: number;
  type: ComponentType;
  phase?: "single" | "three";
  protection?: string[];
}
```

To add a new component, simply:

1. Create a new React component in `src/components/`
2. Add its entry to the `modularItems` array in `src/constants/index.ts` with its specs

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Development

- All components are typed and should extend or use `BaseComponentProps` for consistency
- UI is styled for clarity and responsiveness; see component-specific CSS files
- Circuits and panels can be configured in `defaultCircuits` in `src/constants/index.ts`

## Contributing

Pull requests and suggestions are welcome! Please open an issue or PR for any improvements or new features.

## License

MIT
