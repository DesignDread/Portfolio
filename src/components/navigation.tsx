"use client"
import { useDispatch, useSelector } from "react-redux"
import { toggleContainer } from "../store/menuSlice"
import HamburgerButton from "@/components/header"
import Overlay from "./overlay"

import type { RootState } from "../store/store" // adjust the path if needed

function Navigation() {
  const { isOpen, activeModal } = useSelector((state: RootState) => state.menu)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleContainer())
  }

  return (
    <div className="relative">
      <HamburgerButton isOpen={isOpen} hasActiveModal={!!activeModal} onClick={handleToggle} />
      <Overlay />
    </div>
  )
}

export default Navigation