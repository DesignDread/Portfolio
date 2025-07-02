"use client"

import { useDispatch } from "react-redux"
import { closeModal } from "../../store/menuSlice"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import NeuralNitwits from "../../../public/NeuralNitwits.png"
import stakeNseek from "../../../public/stakeNseek.png"
import HackWithHer from "../../../public/HackWithHer.png"
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"

export default function ProjectsModal() {
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

  const projects = [
    {
      title: "Neural Nitwits",
      description:
        "Neural Nitwits is a modern, AI-powered web application built with Next.js that empowers content creators to optimize their social media strategies. It analyzes engagement data in real time—such as comparing Reels and Stories—to provide actionable insights.",
      tech: ["Next.js", "LangFlow", "AstraDB", "GroqAI"],
      github: "#",
      live: "https://neural-nitwits.vercel.app/",
      image: NeuralNitwits,
    },
    {
      title: "Stake N Seek",
      description:
        "Stake N Seek is a global interactive game where users travel to various locations and complete tasks to earn NFT rewards. The platform brings together participants from around the world, combining adventure with blockchain technology.",
      tech: ["Next.js", "Solidity", "Ethers.js"],
      github: "#",
      live: "#",
      image: stakeNseek,
    },
  ]

  const projects2 = [
    {
      title: "Hack With Her 4.0",
      description:
        "Hack With Her is a 30-hour women-centric hackathon by IEEE-CIET, promoting innovation and inclusivity.It features Codeathon and Makeathon tracks focused on real-world impact and women's empowerment. ",
      tech: ["Next.js", "Particle.js", "Canva", "Mern"],
      github: "#",
      live: "https://hack-with-her.in/",
      image: HackWithHer,
    },
    {
      title: "IEEE CIET official site",
      description:
        "Official website for IEEE CIET chapter, showcasing events, achievements, and community initiatives. Built with modern web technologies to provide an engaging user experience.",
      tech: ["Next.js", "Canva", "MERN"],
      github: "https://ieee.chitkara.edu.in/",
      live: "",
      image: "https://res.cloudinary.com/djy3ewpb8/image/upload/v1735638125/owqol6jkkwjp0efasrrs.png",
    },
  ]

  return (
    // Fixed positioned backdrop overlay
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto p-4" 
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full transition-all duration-500 ease-in-out transform ${
          isVisible && !isExiting
            ? "translate-y-0 opacity-100 scale-100"
            : isExiting
              ? "translate-y-full opacity-0 scale-95"
              : "-translate-y-full opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal content
      >
        <div className="flex flex-col max-h-[90vh] overflow-hidden rounded-2xl">
          {/* Header */}
          <div className="flex bg-[#f2eeff] items-center justify-between px-4 sm:px-8 lg:px-12 flex-shrink-0">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl h-20 sm:h-24 lg:h-32 flex justify-center items-center">
              Projects
            </h1>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              size="2x"
              onClick={handleClose}
              className="cursor-pointer hover:text-gray-600 transition-colors text-xl sm:text-2xl"
            />
          </div>

          {/* Scrollable content area */}
          <div className="p-8 pt-16 overflow-y-auto">
            {/* Personal Projects Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium text-gray-600 mb-4">Personal Projects</h2>
              <p className="text-gray-500 mb-8">Following are the projects that I worked on by myself or with a team.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Project Image/Header */}
                    <div className="h-48 relative overflow-hidden bg-gray-200">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            onClick={() => window.open(project.github, "_blank")}
                          >
                            <Github size={18} />
                          </button>
                          <button
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            onClick={() => window.open(project.live, "_blank")}
                          >
                            <ExternalLink size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-sm text-gray-500 font-medium">Personal Projects</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer-led Projects Section */}
            <div>
              <h2 className="text-2xl font-medium text-gray-600 mb-4">volunteer-led projects</h2>
              <p className="text-gray-500 mb-8">
                Here are some projects where I contributed as a volunteer, collaborating with communities and
                organizations to make a positive impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects2.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Project Image/Header */}
                    <div className="h-48 relative overflow-hidden bg-gray-200">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            onClick={() => window.open(project.github, "_blank")}
                          >
                            <Github size={18} />
                          </button>
                          <button
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            onClick={() => window.open(project.live, "_blank")}
                          >
                            <ExternalLink size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-sm text-gray-500 font-medium"></span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}