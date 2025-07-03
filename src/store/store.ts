
// Alternative approach without lodash throttle:
// store/store.ts (if you don't want to use lodash)
import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./menuSlice"
import { saveState } from "./localStorage"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
})

// Simple debounce without external library
let saveTimeout: NodeJS.Timeout | null = null
store.subscribe(() => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  saveTimeout = setTimeout(() => {
    saveState(store.getState().menu)
  }, 500)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch