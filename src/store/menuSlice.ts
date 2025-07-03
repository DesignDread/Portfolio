import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loadState } from "./localStorage"

interface MenuState {
  isOpen: boolean
  activeModal: string | null
}

// Load persisted state or use default
const persistedState = loadState()
const initialState: MenuState = persistedState || {
  isOpen: false,
  activeModal: null,
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleContainer: (state) => {
      state.isOpen = !state.isOpen
      if (!state.isOpen) {
        state.activeModal = null
      }
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload
      state.isOpen = true
    },
    closeModal: (state) => {
      state.activeModal = null
    },
    openContainer: (state) => {
      state.isOpen = true
    },
    closeContainer: (state) => {
      state.isOpen = false
      state.activeModal = null
    },
  },
})

export const { 
  toggleContainer, 
  openModal, 
  closeModal,
  openContainer,
  closeContainer 
} = menuSlice.actions

export default menuSlice.reducer