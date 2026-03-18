// ============================================================
// AuthContext.jsx — Connected to real MySQL backend via API
// Provides: user, login, signup, logout, isLoggedIn,
//           loading, error, updateProfile, clearError
// ============================================================
import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext(null)

// Backend API base URL — reads from .env.local
// In your .env.local add: VITE_API_URL=http://localhost:5000
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ── Reducer ──────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.value, error: null }
    case 'SET_ERROR':   return { ...state, loading: false, error: action.message }
    case 'LOGIN':       return { ...state, loading: false, error: null, user: action.user }
    case 'LOGOUT':      return { ...state, loading: false, error: null, user: null }
    case 'UPDATE':      return { ...state, user: { ...state.user, ...action.data } }
    case 'CLEAR_ERROR': return { ...state, error: null }
    default:            return state
  }
}

const TOKEN_KEY = 'ss_auth_token'
const USER_KEY  = 'ss_auth_user'

// ── Helper: API call with auth token ─────────────────────────
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY)
  const res = await fetch(`${API}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong.')
  return data
}

// ── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user:    null,
    loading: true,   // true on mount while we check stored token
    error:   null,
  })

  // On mount: re-hydrate session from localStorage token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const stored = localStorage.getItem(USER_KEY)

    if (token && stored) {
      try {
        const user = JSON.parse(stored)
        dispatch({ type: 'LOGIN', user })

        // Silently verify token is still valid with the server
        apiCall('/api/auth/me')
          .then(data => dispatch({ type: 'LOGIN', user: data.user }))
          .catch(() => {
            // Token expired or invalid — clear session
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)
            dispatch({ type: 'LOGOUT' })
          })
      } catch {
        dispatch({ type: 'SET_LOADING', value: false })
      }
    } else {
      dispatch({ type: 'SET_LOADING', value: false })
    }
  }, [])

  // ── signup ────────────────────────────────────────────────
  const signup = async ({ name, email, phone = '', password }) => {
    dispatch({ type: 'SET_LOADING', value: true })
    try {
      const data = await apiCall('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password }),
      })
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      dispatch({ type: 'LOGIN', user: data.user })
      return true
    } catch (err) {
      dispatch({ type: 'SET_ERROR', message: err.message })
      return false
    }
  }

  // ── login ─────────────────────────────────────────────────
  const login = async ({ email, password }) => {
    dispatch({ type: 'SET_LOADING', value: true })
    try {
      const data = await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      dispatch({ type: 'LOGIN', user: data.user })
      return true
    } catch (err) {
      dispatch({ type: 'SET_ERROR', message: err.message })
      return false
    }
  }

  // ── logout ────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    dispatch({ type: 'LOGOUT' })
  }

  // ── updateProfile ─────────────────────────────────────────
  const updateProfile = async ({ name, phone }) => {
    try {
      const data = await apiCall('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name, phone }),
      })
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      dispatch({ type: 'UPDATE', data: data.user })
      return true
    } catch (err) {
      dispatch({ type: 'SET_ERROR', message: err.message })
      return false
    }
  }

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' })

  return (
    <AuthContext.Provider value={{
      user:       state.user,
      loading:    state.loading,
      error:      state.error,
      isLoggedIn: !!state.user,
      signup,
      login,
      logout,
      updateProfile,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
