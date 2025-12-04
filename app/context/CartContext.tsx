import React, { createContext, useContext, useReducer } from 'react';
import { Produto } from '../services/api';

export type CartItem = Produto & { quantidade: number };

export type State = {
  items: CartItem[];
};

export type Action =
  | { type: 'ADD_ITEM'; payload: Produto }
  | { type: 'INCREMENT'; payload: { id: number } }
  | { type: 'DECREMENT'; payload: { id: number } }
  | { type: 'REMOVE'; payload: { id: number } };

export type CartContextType = {
  state: State;
  addItem: (p: Produto) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  total: () => number;
};

export type CartProviderProps = {
  children: React.ReactNode;
};

const initialState: State = {
  items: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantidade: i.quantidade + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantidade: 1 }],
      };
    }

    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantidade: i.quantidade + 1 } : i
        ),
      };

    case 'DECREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantidade: Math.max(1, i.quantidade - 1) }
            : i
        ),
      };

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload.id),
      };

    default:
      return state;
  }
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (p: Produto) => dispatch({ type: 'ADD_ITEM', payload: p });
  const increment = (id: number) => dispatch({ type: 'INCREMENT', payload: { id } });
  const decrement = (id: number) => dispatch({ type: 'DECREMENT', payload: { id } });
  const remove = (id: number) => dispatch({ type: 'REMOVE', payload: { id } });

  const total = () =>
    state.items.reduce((s, i) => s + i.preco * i.quantidade, 0);

  return (
    <CartContext.Provider value={{ state, addItem, increment, decrement, remove, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

