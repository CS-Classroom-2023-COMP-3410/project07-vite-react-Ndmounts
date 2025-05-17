import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext([]);
export const useCart = () => useContext(CartContext);

// --- reducer -------------------------------------------------------------
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const found = state.find(i => i.id === action.product.id);
      if (found) {
        return state.map(i =>
          i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE_ONE':
      return state.flatMap(i => {
        if (i.id !== action.id) return i;
        return i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : [];
      });
    case 'REMOVE_ALL':
      return state.filter(i => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

// --- provider ------------------------------------------------------------
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, []);

  const addToCart   = product => dispatch({ type: 'ADD',         product });
  const removeOne   = id      => dispatch({ type: 'REMOVE_ONE',  id });
  const removeAll   = id      => dispatch({ type: 'REMOVE_ALL',  id });
  const clearCart   = ()      => dispatch({ type: 'CLEAR' });

  const totalItems  = cart.reduce((n, i) => n + i.quantity, 0);
  const totalPrice  = cart.reduce((n, i) => n + i.price*i.quantity, 0);

  const value = { cart, addToCart, removeOne, removeAll, clearCart, totalItems, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
