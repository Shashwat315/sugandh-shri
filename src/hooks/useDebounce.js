// ============================================================
// useDebounce.js
// Debounce any value — useful for search inputs.
// Usage: const debouncedQuery = useDebounce(query, 300)
// ============================================================
import { useState, useEffect } from 'react'

export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
