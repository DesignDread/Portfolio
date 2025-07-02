"use client"

import type React from "react"
import Image from "next/image"
import Logo from "../../public/Logo.png"

interface HamburgerButtonProps {
  isOpen: boolean
  hasActiveModal: boolean
  isActive?: boolean
  onClick: () => void
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, hasActiveModal, isActive, onClick }) => (
  <>
    {/* Logo container with lower z-index */}
    <div className="fixed top-0 left-0 z-20 pointer-events-none h-20 sm:h-24 md:h-28 lg:h-32 px-4 sm:px-6 flex items-center">
      <div className="pointer-events-auto">
        <Image
          src={Logo}
          alt="Logo"
          className="w-32 relative  left-5 lg:left-16 sm:w-40 md:w-32 lg:w-48 h-auto transition-opacity duration-300"
        />
      </div>
    </div>
    
    {/* Hamburger button with higher z-index */}
    <div
      onClick={onClick}
      className={`fixed top-4 sm:top-5 md:top-6 lg:top-8 right-5 lg:right-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg flex gap-2 sm:gap-3 flex-col items-center justify-center cursor-pointer transition-all duration-300 z-30 ${
        isOpen || hasActiveModal ? "bg-gray-200" : "bg-white"
      }`}
    >
      {/* Cross/Hamburger Animation */}
      <div
        className={`w-4 sm:w-5 md:w-6 h-0.5 sm:h-0.5 md:h-1 bg-black transition-transform duration-300 rounded-xl ${
          isOpen || hasActiveModal ? "transform rotate-45 translate-y-2 sm:translate-y-2.5 md:translate-y-4" : ""
        } ${isActive ? "active" : ""}`}
      />
      <div
        className={`w-6 sm:w-8 md:w-10 h-0.5 sm:h-0.5 md:h-1 bg-black transition-opacity duration-300 rounded-xl ${
          isOpen || hasActiveModal ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`w-4 sm:w-5 md:w-6 h-0.5 sm:h-0.5 md:h-1 bg-black transition-transform duration-300 rounded-xl ${
          isOpen || hasActiveModal ? "transform -rotate-45 -translate-y-2 sm:-translate-y-2.5 md:-translate-y-4" : ""
        } ${isActive ? "active" : ""}`}
      />
    </div>
  </>
)

export default HamburgerButton