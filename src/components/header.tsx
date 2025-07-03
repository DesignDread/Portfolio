"use client"

import type React from "react"
import Image from "next/image"
import Logo from "../../public/Logo.png"
import { faFileAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface HamburgerButtonProps {
  isOpen: boolean
  hasActiveModal: boolean
  
  onClick: () => void
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, hasActiveModal,  onClick }) => (
  <>
    {/* Logo container with lower z-index */}
    <div className="fixed top-0 left-0 z-20 pointer-events-none h-16 sm:h-20 md:h-24 lg:h-28 px-2 sm:px-4 md:px-6 flex items-center">
      <div className="pointer-events-auto">
        <Image
          src={Logo}
          alt="Logo"
          className="w-24 sm:w-32 md:w-36 lg:w-48 h-auto relative left-2 sm:left-5 lg:left-16 transition-opacity duration-300"
        />
      </div>
    </div>
    
    {/* Button container with proper spacing */}
    <div className="flex fixed top-2 sm:top-4 md:top-6 lg:top-8 right-2 sm:right-4 lg:right-16 z-30 gap-2 sm:gap-4">
      {/* Resume button */}
      <button
        className="font-semibold p-2 sm:py-2 sm:px-4 flex items-center justify-center transition-all duration-300 touch-manipulation"
        onClick={() => window.open("/Anubhav_Resume.pdf", "_blank")}
        type="button"
        aria-label="Download Resume"
      >
        <FontAwesomeIcon icon={faFileAlt} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
      </button>

      {/* Hamburger menu button */}
      <button
        onClick={onClick}
        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 touch-manipulation ${
          isOpen || hasActiveModal ? "bg-gray-200" : "bg-white"
        }`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {/* Hamburger lines with proper mobile spacing */}
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
          <div
            className={`w-4 sm:w-5 md:w-6 h-0.5 bg-black transition-all duration-300 rounded-full ${
              isOpen || hasActiveModal 
                ? "transform rotate-45 translate-y-1.5 sm:translate-y-2 md:translate-y-2.5" 
                : ""
            }`}
          />
          <div
            className={`w-5 sm:w-6 md:w-8 h-0.5 bg-black transition-all duration-300 rounded-full ${
              isOpen || hasActiveModal ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`w-4 sm:w-5 md:w-6 h-0.5 bg-black transition-all duration-300 rounded-full ${
              isOpen || hasActiveModal 
                ? "transform -rotate-45 -translate-y-1.5 sm:-translate-y-2 md:-translate-y-2.5" 
                : ""
            }`}
          />
        </div>
      </button>
    </div>
  </>
)

export default HamburgerButton