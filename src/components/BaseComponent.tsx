import React from 'react';
import { BaseComponentProps, ComponentState } from '../types';

export abstract class BaseComponent<P extends BaseComponentProps = BaseComponentProps, S extends ComponentState = ComponentState> 
  extends React.Component<P, S> {
  
  constructor(props: P) {
    super(props);
    this.state = {
      id: props.id,
      type: props.specs.type,
      isOn: props.isOn,
      current: 0,
      voltage: props.specs.voltage,
      power: 0,
      lastUpdated: new Date(),
      isFaulty: false
    } as S;
  }

  componentDidUpdate(prevProps: P) {
    if (prevProps.isOn !== this.props.isOn) {
      this.setState({ isOn: this.props.isOn });
    }
  }

  protected calculatePower(): number {
    return this.state.current * this.state.voltage;
  }

  protected handleToggle = () => {
    const newIsOn = !this.state.isOn;
    this.setState({
      isOn: newIsOn,
      current: newIsOn ? (this.state.voltage * 0.1) : 0,
      power: newIsOn ? this.calculatePower() : 0,
      lastUpdated: new Date()
    });
    this.props.onToggle();
  }

  protected handleFault = (isFaulty: boolean) => {
    this.setState({ isFaulty });
    this.props.onFault?.(isFaulty);
  }

  protected getStatusColor(): string {
    if (this.state.isFaulty) return '#dc3545';
    return this.state.isOn ? '#28a745' : '#6c757d';
  }

  protected getComponentClass(): string {
    return `${this.props.specs.type.toLowerCase()}-component`;
  }

  abstract render(): React.ReactNode;
} 