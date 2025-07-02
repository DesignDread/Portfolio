import { createSlice } from "@reduxjs/toolkit"

interface MenuState {
  isOpen: boolean
  activeModal: string | null
}

const initialState: MenuState = {
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
    openModal: (state, action) => {
      state.activeModal = action.payload
      state.isOpen = true
    },
    closeModal: (state) => {
      state.activeModal = null
      // state.isOpen = false
    },
  },
})

export const { toggleContainer, openModal, closeModal } = menuSlice.actions
export default menuSlice.reducer
