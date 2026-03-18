// ============================================================
// CartContext.jsx
// Global cart state using React Context + useReducer.
// Provides: items, addItem, removeItem, updateQty, clearCart,
//           cartCount, cartTotal, isOpen, toggleCart
// ============================================================
import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.product.id)
      if (existing) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY':
      return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [isOpen, setIsOpen] = useState(false)

  const addItem    = product => { dispatch({ type: 'ADD', product }); setIsOpen(true) }
  const removeItem = id      => dispatch({ type: 'REMOVE', id })
  const updateQty  = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart  = ()      => dispatch({ type: 'CLEAR' })
  const toggleCart = ()      => setIsOpen(o => !o)

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal, isOpen, toggleCart, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
