import React from 'react';
import { BaseComponent, BaseComponentProps, BaseComponentState } from '../BaseComponent';
import './socket.css';

interface SocketProps extends BaseComponentProps {
  label?: string;
}

interface SocketState extends BaseComponentState {
  isFaulty: boolean;
}

class Socket extends BaseComponent<SocketProps, SocketState> {
  constructor(props: SocketProps) {
    super(props);
    this.state = {
      isOn: props.isOn,
      current: 0,
      voltage: props.specs.voltage || 0,
      power: 0,
      lastUpdated: new Date(),
      isFaulty: false
    };
  }

  render() {
    const { label = 'Power Socket' } = this.props;
    const { isOn, isFaulty, voltage, current, power } = this.state;
    const statusColor = this.getStatusColor();
    const componentClass = this.getComponentClass();

    return (
      <div className={`socket ${componentClass}`}>
        <div className="socket-header">
          <h3>{label}</h3>
          <div className="socket-status" style={{ color: statusColor }}>
            {isOn ? 'ON' : 'OFF'}
          </div>
        </div>
        <div className="socket-body">
          <div className="socket-outlet">
            <div className="socket-holes">
              <div className="socket-hole live" />
              <div className="socket-hole neutral" />
              <div className="socket-hole earth" />
            </div>
          </div>
          <div className="socket-specs">
            <p>Voltage: {voltage}V</p>
            <p>Current: {current.toFixed(2)}A</p>
            <p>Power: {power.toFixed(2)}W</p>
          </div>
        </div>
        <button 
          className={`socket-toggle ${isOn ? 'on' : 'off'}`}
          onClick={this.handleToggle}
          disabled={isFaulty}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
        {isFaulty && (
          <div className="socket-fault">
            Fault Detected
          </div>
        )}
      </div>
    );
  }
}

export default Socket;
