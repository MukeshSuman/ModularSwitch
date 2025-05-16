import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Component, Connection } from '../types/components';

interface BoardState {
  components: Component[];
  connections: Connection[];
  selectedComponent: string | null;
}

type BoardAction =
  | { type: 'ADD_COMPONENT'; payload: Component }
  | { type: 'REMOVE_COMPONENT'; payload: string }
  | { type: 'UPDATE_COMPONENT'; payload: Component }
  | { type: 'ADD_CONNECTION'; payload: Connection }
  | { type: 'REMOVE_CONNECTION'; payload: string }
  | { type: 'SELECT_COMPONENT'; payload: string | null }
  | { type: 'TOGGLE_COMPONENT'; payload: string };

const initialState: BoardState = {
  components: [],
  connections: [],
  selectedComponent: null,
};

const BoardContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
} | null>(null);

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case 'REMOVE_COMPONENT':
      return {
        ...state,
        components: state.components.filter(c => c.id !== action.payload),
        connections: state.connections.filter(
          c => c.from !== action.payload && c.to !== action.payload
        ),
      };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'ADD_CONNECTION':
      return {
        ...state,
        connections: [...state.connections, action.payload],
      };
    case 'REMOVE_CONNECTION':
      return {
        ...state,
        connections: state.connections.filter(c => c.id !== action.payload),
      };
    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedComponent: action.payload,
      };
    case 'TOGGLE_COMPONENT':
      return {
        ...state,
        components: state.components.map(c =>
          c.id === action.payload
            ? { ...c, status: c.status === 'on' ? 'off' : 'on' }
            : c
        ),
      };
    default:
      return state;
  }
}

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
} 