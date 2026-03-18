// ============================================================
// WishlistContext.jsx
// Global wishlist using Context + useReducer.
// Provides: items, toggle(product), isWishlisted(id), count
// ============================================================
import { createContext, useContext, useReducer } from 'react'

const WishlistContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.find(i => i.id === action.product.id)
        ? state.filter(i => i.id !== action.product.id)
        : [...state, action.product]
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const toggle       = product => dispatch({ type:'TOGGLE', product })
  const remove       = id      => dispatch({ type:'REMOVE', id })
  const clear        = ()      => dispatch({ type:'CLEAR' })
  const isWishlisted = id      => items.some(i => i.id === id)
  return (
    <WishlistContext.Provider value={{ items, toggle, remove, clear, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider')
  return ctx
}
