export const loadState = () => {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return undefined
  }
  
  try {
    const serializedState = localStorage.getItem('menuState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Could not load state", err)
    return undefined
  }
}

export const saveState = (state: unknown) => {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('menuState', serializedState)
  } catch (err) {
    console.error("Could not save state", err)
  }
}