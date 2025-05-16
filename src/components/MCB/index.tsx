import React from 'react';
import { BaseComponent, BaseComponentProps } from '../BaseComponent';
import './mcb.css';

interface MCBProps extends BaseComponentProps {
  label?: string;
}

interface MCBState {
  isTripped: boolean;
}

class MCB extends BaseComponent<MCBProps, MCBState> {
  constructor(props: MCBProps) {
    super(props);
    this.state = {
      ...this.state,
      isTripped: false
    };
  }

  private handleTrip = () => {
    const { isTripped } = this.state;
    this.setState({ isTripped: !isTripped });
    this.handleFault(!isTripped);
  };

  render() {
    const { label = 'MCB' } = this.props;
    const { isOn, isTripped, voltage, current, power } = this.state;
    const statusColor = this.getStatusColor();
    const componentClass = this.getComponentClass();

    return (
      <div className={`mcb ${componentClass}`}>
        <div className="mcb-header">
          <h3>{label}</h3>
          <div className="mcb-status" style={{ color: statusColor }}>
            {isTripped ? 'TRIPPED' : isOn ? 'ON' : 'OFF'}
          </div>
        </div>
        <div className="mcb-body">
          <div className="mcb-switch">
            <div className={`mcb-lever ${isOn ? 'on' : 'off'} ${isTripped ? 'tripped' : ''}`} />
          </div>
          <div className="mcb-specs">
            <p>Voltage: {voltage}V</p>
            <p>Current: {current.toFixed(2)}A</p>
            <p>Power: {power.toFixed(2)}W</p>
          </div>
        </div>
        <div className="mcb-controls">
          <button 
            className={`mcb-toggle ${isOn ? 'on' : 'off'}`}
            onClick={this.handleToggle}
            disabled={isTripped}
          >
            {isOn ? 'Turn Off' : 'Turn On'}
          </button>
          <button 
            className={`mcb-trip ${isTripped ? 'tripped' : ''}`}
            onClick={this.handleTrip}
          >
            {isTripped ? 'Reset' : 'Trip'}
          </button>
        </div>
      </div>
    );
  }
}

export default MCB; 