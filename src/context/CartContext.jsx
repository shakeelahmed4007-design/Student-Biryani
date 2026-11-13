import { createContext, useContext, useReducer } from 'react';
import { menu } from '../data/menu';
const CartContext = createContext(null);
export function cartReducer(state, action) {
 if (action.type === 'clear') return {};
 const item = menu.find(x => x.id === action.id);
 if (!item) return state;
 const qty = Math.max(0, Math.min(99, (state[action.id] || 0) + action.delta));
 const next = { ...state, [action.id]: qty };
 if (!qty) delete next[action.id];
 return next;
}
export function CartProvider({ children }) {
 const [cart, dispatch] = useReducer(cartReducer, {});
 const items = menu.filter(x => cart[x.id]).map(x => ({...x, quantity:cart[x.id]}));
 const count = items.reduce((n,x) => n+x.quantity,0);
 const subtotal = items.reduce((n,x) => n+x.price*x.quantity,0);
 return <CartContext.Provider value={{cart,items,count,subtotal,change:(id,delta)=>dispatch({id,delta}),clear:()=>dispatch({type:'clear'})}}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
