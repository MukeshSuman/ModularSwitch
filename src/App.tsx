import React from 'react';
import './App.css';
import ElectricalPanel from './components/ElectricalPanel';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>House Wiring Simulation</h1>
      </header>
      <main className="app-main">
        <ElectricalPanel />
      </main>
    </div>
  );
}
