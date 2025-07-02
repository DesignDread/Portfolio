"use client"
import { useDispatch, useSelector } from "react-redux"
import { toggleContainer, openModal } from "../store/menuSlice"
import AboutModal from "./modals/about-modal"
import ProjectsModal from "./modals/project-modal"
import Link from "next/link"
import type { RootState } from "../store/store" // Adjust the path if needed

function Overlay() {
  const { isOpen, activeModal } = useSelector((state: RootState) => state.menu)
  const dispatch = useDispatch()

  const handleMenuClick = (modalType: string) => {
    dispatch(openModal(modalType))
  }

  const handleBackdropClick = () => {
    dispatch(toggleContainer())
  }



  return (
    <>
      {/* Circle Background */}
      <div
        className={`fixed z-10 bg-[#000000CC] rounded-full transition-all duration-1000 ease-in-out ${
          isOpen
            ? "w-[300vmax] h-[300vmax] top-[10%] right-[55%] translate-x-1/2 -translate-y-1/2"
            : "w-0 h-0 top-[10%] right-[7%] translate-x-1/2 -translate-y-1/2"
        }`}
      ></div>

      {/* Menu Items */}
      {isOpen && !activeModal && (
        <ul className="fixed inset-0 z-20 text-[#b0b0b1] font-bold flex flex-col justify-center items-center transition-all duration-1000 ease-in-out opacity-100 pointer-events-auto scale-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          <li
            className="p-3 sm:p-4 md:p-5 hover:text-white cursor-pointer transition-colors duration-300 animate-in slide-in-from-top-4"
            onClick={() => handleMenuClick("about")}
            style={{ animationDelay: "100ms" }}
          >
            About
          </li>
          <li
            className="p-3 sm:p-4 md:p-5 hover:text-white cursor-pointer transition-colors duration-300 animate-in slide-in-from-top-4"
            onClick={() => handleMenuClick("projects")}
            style={{ animationDelay: "200ms" }}
          >
            Projects
          </li>
          <li
            className="p-3 sm:p-4 md:p-5 hover:text-white cursor-pointer transition-colors duration-300 animate-in slide-in-from-top-4"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="mailto:anubhav8392@gmail.com"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
              onClick={(e) => e.stopPropagation()} // Only stop propagation on the link itself
            >
              Connect
            </a>
          </li>
          <li
            className="p-3 sm:p-4 md:p-5 hover:text-white cursor-pointer transition-colors duration-300 animate-in slide-in-from-top-4"
            style={{ animationDelay: "400ms" }}
          >
           <Link href="https://dev.to/anubhavvv___" />
             Blog
          </li>
        </ul>
      )}

      {/* Modals */}
      {activeModal === "about" && <AboutModal />}
      {activeModal === "projects" && <ProjectsModal />}

      {/* Backdrop for modals */}
      {activeModal && (
        <div 
          className="fixed inset-0 backdrop-blur-sm z-30"
          onClick={handleBackdropClick}
        />
      )}
    </>
  )
}

export default Overlay