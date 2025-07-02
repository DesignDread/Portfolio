import Image from 'next/image'
import Bitmoji from "../../public/bitmoji.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] lg:pt-12  px-4 sm:px-6 lg:px-8 max-h-screen relative  ">
      {/* Avatar */}
      <div className="relative   pointer-events-none">
        <div className="relative  w-52 h-52 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-72 2xl:h-72 overflow-hidden ">
          <Image
            src={Bitmoji}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-5  items-center w-full font-bold text-center">
        {/* Text Content */}
        <div className="flex flex-col items-center justify-center ">
          <h1 className="z-20 text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
            Hi, I&apos;m Anubhav!
          </h1>
          <p className="z-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-700 font-medium">
            Full Stack | Web Designer | Freelancing
          </p>
        </div>

        {/* Social Icons */}
        <div className="z-30 flex space-x-4 sm:space-x-6 lg:space-x-8 gap-4 pt-8">
          <a 
            href="https://x.com/Anubhavvv__" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="pointer-events-auto hover:cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faXTwitter} 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" 
              size='2x'
            />
          </a>
          
          <a 
            href="https://github.com/DesignDread" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="pointer-events-auto hover:cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faGithub} 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" 
              size='2x'
            />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/anubhav-garg-086b89292/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="pointer-events-auto hover:cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faLinkedin} 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" 
              size='2x'
            />
          </a>
          
          <a 
            href="mailto:anubhav8392@gmail.com"
            className="pointer-events-auto hover:cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" 
              size='2x'
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero