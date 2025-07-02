"use client"
import Hero from "@/components/Hero"
import CanvasPainter from "@/components/canvas"
import Overlay from "@/components/overlay"
import Navigation from "../components/navigation"; // Adjust the path if needed
export default function Portfolio() {
  // const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Navigation/>
      {/* Canvas Background - z-10 */}
      <CanvasPainter />

      {/* Main Content - z-20 to be above canvas */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Header */}
        <div className="p-6">
          {/* <Header isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} /> */}
        </div>
        {/* Hero Section */}
        <Hero/>
        {/* Main Content */}
        <Overlay/>
       
      </div>
    </div>
  )
}