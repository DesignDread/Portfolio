"use client"

import type React from "react"

import { useDispatch } from "react-redux"
import { closeModal } from "../../store/menuSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faEnvelope, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import Picture from "../../../public/Anubhav.jpg"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function AboutModal() {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50)
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      clearTimeout(timer)
      // Restore body scroll when component unmounts
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsExiting(true)
    
    // Wait for exit animation to complete before closing
    setTimeout(() => {
      dispatch(closeModal())
      // Restore body scroll
      document.body.style.overflow = 'unset'
    }, 300)
  }

  // Add this new function for backdrop clicks
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    // Fixed positioned backdrop overlay
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10" 
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white w-full max-w-7xl rounded-3xl transition-all duration-500 ease-in-out transform ${
          isVisible && !isExiting
            ? "translate-y-0 opacity-100 scale-100"
            : isExiting
              ? "translate-y-full opacity-0 scale-95"
              : "-translate-y-full opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal content
      >
        <div className="flex flex-col rounded-3xl max-w-full w-full max-h-[90vh] overflow-hidden">
          <div className="flex bg-[#f2eeff] items-center justify-between px-4 sm:px-8 lg:px-12 flex-shrink-0">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl h-20 sm:h-24 lg:h-32 flex justify-center items-center">
              About
            </h1>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              size="2x"
              onClick={handleClose}
              className="cursor-pointer hover:text-gray-600 transition-colors text-xl sm:text-2xl"
            />
          </div>
          
          {/* Scrollable content area */}
          <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-8 lg:gap-16 xl:gap-32 max-w-7xl m-auto overflow-y-auto">
            {/* Profile Section */}
            <div className="flex flex-col items-center lg:items-center lg:basis-1/3 order-1 lg:order-1">
              <div className="text-center lg:text-left">
                <Image
                  src={Picture || "/placeholder.svg"}
                  alt="Anubhav Garg"
                  className="rounded-full w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 shadow-lg mx-auto lg:mx-0"
                  priority
                />
                <h3 className="font-bold text-xl sm:text-2xl">Anubhav Garg</h3>
                <div className="text-sm mb-1 flex gap-2 items-center justify-center lg:justify-start">
                  <FontAwesomeIcon icon={faEnvelope} size="1x" className="pr-2" />
                  <span className="break-all">anubhav8392@gmail.com</span>
                </div>
                <div className="text-sm mb-1 flex gap-2 items-center justify-center lg:justify-start">
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" className="pr-2" />
                  Punjab, India
                </div>
                <div className="flex gap-4 justify-center lg:justify-start mt-4">
                  <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="1x" className="hover:text-blue-500 transition-colors" />
                  </a>
                  <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="1x" className="hover:text-gray-800 transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="1x" className="hover:text-blue-600 transition-colors" />
                  </a>
                  <a href="mailto:anubhav8392@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} size="1x" className="hover:text-blue-500 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:basis-2/3 order-2 lg:order-2">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="p-3">
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Full Stack Developer</h3>
                  <p className="text-sm sm:text-base">
                    Driven full-stack developer specializing in front-end development and design, with a passion for
                    creating responsive, user-centric interfaces. Skilled in transforming design concepts into seamless,
                    functional web applications that provide intuitive and engaging user experiences.
                  </p>
                </div>

                <div className="flex flex-col p-3">
                  <h1 className="font-bold text-xl sm:text-2xl mb-2">Skills</h1>
                  <ul className="space-y-1 text-sm sm:text-base">
                    <li>
                      <strong>Languages:</strong> C, CPP, Python, Java, Javascript, Typescript
                    </li>
                    <li>
                      <strong>Frontend:</strong> ReactJs, Vuejs, ViteJs, NextJs, TailwindCSS, SCSS, Bootstrap, GSAP,
                      Framer Motion
                    </li>
                    <li>
                      <strong>Backend:</strong> NodeJs, ExpressJs
                    </li>
                    <li>
                      <strong>Database:</strong> MySQL, MongoDB
                    </li>
                    <li>
                      <strong>Other:</strong> Git, Github, Canva, Figma
                    </li>
                  </ul>
                </div>

                <div className="p-3">
                  <h1 className="font-bold text-xl sm:text-2xl mb-2">Education</h1>
                  <div>
                    <h6 className="font-bold text-sm">Chitkara University</h6>
                    <p className="text-sm">BE CSE (Aug 2023 - June 2027)</p>
                    <p className="text-sm">Punjab, India</p>
                  </div>
                </div>

                <div className="p-3">
                  <h1 className="font-bold text-xl sm:text-2xl mb-2">Work Experience</h1>
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-bold text-sm">Full Stack Development Intern - TBB media</h4>
                      <p className="text-sm text-gray-500">SEP 2023 - Present</p>
                      <p className="text-sm">
                        Worked on multiple full stack projects with different teams. Meeting with client asking their
                        review for fulfilling their needs.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-bold text-sm">Research and Graphics - CURIN</h4>
                      <p className="text-sm text-gray-500">SEP 2024 - Present</p>
                      <p className="text-sm">
                        Conducted in-depth data analysis and implemented advanced AI/ML models to validate research
                        hypotheses. Designed and created professional-quality graphics and data visualizations using
                        tools like Canva and Origin.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-bold text-sm">Technical Team Member - IEEE-CIET</h4>
                      <p className="text-sm text-gray-500">Jan 2025 - Present</p>
                      <p className="text-sm">
                        Collaborated with stakeholders to align the design with project goals, enhancing accessibility
                        and visual appeal. Organized and facilitated technical and non-technical meetings and events.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-bold text-sm">Web Team Member - OSC</h4>
                      <p className="text-sm text-gray-500">Jan 2025</p>
                      <p className="text-sm">
                        Engaged with individuals and teams, fostering strong relationships and effective collaboration
                        across various domains.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="p-3">
                  <h1 className="font-bold text-xl sm:text-2xl mb-2">Achievements</h1>
                  <ul className="list-disc text-sm space-y-1 ml-4">
                    <li>HackIndia Hackathon finalist with over 270+ teams</li>
                    <li>{"Name in Dean's list for 'Mentor's Mind', 'Star Programmer'"}</li>
                    <li>Runner-Up and Black knight Award at web development Code Relay by CN-CUIET</li>
                    <li>Second Runner-Up at Codiy The Unfind by CN-CUIET</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}