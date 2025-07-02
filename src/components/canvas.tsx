"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"

const CanvasPainter = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const animationRef = useRef<number | null>(null)
  const lastDrawTimeRef = useRef<number>(0)

  const [painting, setPainting] = useState(false)
  const [brushColor, setBrushColor] = useState("#c3c4eb")
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [mouseoverCount, setMouseoverCount] = useState(0)
  const [pendingDraw, setPendingDraw] = useState<{ x: number; y: number } | null>(null)

  const brushSize = 250
  const colors = useMemo(() => ["#c3c4eb", "#eedff8", "#f2eeff", "#f8f4ff", "#FFF2E0"], [])
  const TARGET_FPS = 60
  const FRAME_DURATION = useMemo(() => 1000 / TARGET_FPS, [TARGET_FPS])

  const throttle = useCallback(<T extends unknown[]>(
    func: (...args: T) => void, 
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout
    let lastExecTime = 0
    return (...args: T) => {
      const currentTime = Date.now()
      if (currentTime - lastExecTime > delay) {
        func(...args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(
          () => {
            func(...args)
            lastExecTime = Date.now()
          },
          delay - (currentTime - lastExecTime),
        )
      }
    }
  }, [])

  const updateCanvasCache = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      ctxRef.current = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      })
      if (ctxRef.current) {
        ctxRef.current.strokeStyle = brushColor
        ctxRef.current.fillStyle = brushColor
        ctxRef.current.lineWidth = brushSize
        ctxRef.current.lineCap = "round"
        ctxRef.current.lineJoin = "round"
      }
      rectRef.current = canvas.getBoundingClientRect()
    }
  }, [brushColor, brushSize])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const width = window.innerWidth
      const height = window.innerHeight
      let imageData = null

      if (canvas.width > 0 && canvas.height > 0 && ctxRef.current) {
        try {
          imageData = ctxRef.current.getImageData(0, 0, canvas.width, canvas.height)
        } catch {
          imageData = null
        }
      }

      canvas.width = width
      canvas.height = height
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"

      updateCanvasCache()

      // Fill background color
      if (ctxRef.current) {
        ctxRef.current.fillStyle = "#f8f4ff"
        ctxRef.current.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (imageData && ctxRef.current) {
        ctxRef.current.putImageData(imageData, 0, 0)
      }
    }
  }, [updateCanvasCache])

  const drawSmoothStroke = useCallback(
    (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    },
    [brushColor, brushSize],
  )

  const drawCircle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.fillStyle = brushColor
      ctx.beginPath()
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2)
      ctx.fill()
    },
    [brushColor, brushSize],
  )

  const paint = useCallback(
    (x: number, y: number) => {
      if (!painting || !ctxRef.current) return

      const now = performance.now()
      if (now - lastDrawTimeRef.current < FRAME_DURATION) {
        setPendingDraw({ x, y })
        return
      }

      lastDrawTimeRef.current = now
      drawSmoothStroke(ctxRef.current, lastPosition.x, lastPosition.y, x, y)
      setLastPosition({ x, y })
      setPendingDraw(null)
    },
    [painting, lastPosition, drawSmoothStroke, FRAME_DURATION],
  )

  useEffect(() => {
    if (pendingDraw && painting) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(() => {
        paint(pendingDraw.x, pendingDraw.y)
      })
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [pendingDraw, painting, paint])

  const throttledMouseMove = useMemo(
    () => throttle((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!rectRef.current) return
      const x = e.clientX - rectRef.current.left
      const y = e.clientY - rectRef.current.top
      paint(x, y)
    }, 16),
    [paint, throttle],
  )

  const getMousePosition = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!rectRef.current) {
      rectRef.current = canvasRef.current?.getBoundingClientRect() || null
    }
    if (!rectRef.current) return { x: 0, y: 0 }

    return {
      x: e.clientX - rectRef.current.left,
      y: e.clientY - rectRef.current.top,
    }
  }, [])

  const startPainting = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      setPainting(true)
      setMouseoverCount((prev) => prev + 1)

      if ((mouseoverCount + 1) % 5 === 0) {
        setBrushColor(colors[Math.floor(Math.random() * colors.length)])
      }

      const { x, y } = getMousePosition(e)
      setLastPosition({ x, y })

      if (ctxRef.current) {
        drawCircle(ctxRef.current, x, y)
      }
    },
    [mouseoverCount, colors, getMousePosition, drawCircle],
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!painting) {
        startPainting(e)
      }
    },
    [painting, startPainting],
  )

  const stopPainting = useCallback(() => {
    setPainting(false)
    setPendingDraw(null)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const throttledResize = useMemo(
    () => throttle(() => {
      resizeCanvas()
    }, 100),
    [resizeCanvas, throttle],
  )

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", throttledResize)

    return () => {
      window.removeEventListener("resize", throttledResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resizeCanvas, throttledResize])

  useEffect(() => {
    const updateRect = () => {
      if (canvasRef.current) {
        rectRef.current = canvasRef.current.getBoundingClientRect()
      }
    }

    window.addEventListener("scroll", updateRect)
    window.addEventListener("resize", updateRect)

    return () => {
      window.removeEventListener("scroll", updateRect)
      window.removeEventListener("resize", updateRect)
    }
  }, [])

  return (
    <canvas
      className="fixed top-0 left-0 z-10 pointer-events-auto"
      ref={canvasRef}
      onMouseDown={startPainting}
      onMouseUp={stopPainting}
      onMouseMove={throttledMouseMove}
      onMouseLeave={stopPainting}
      onMouseEnter={handleMouseEnter}
      style={{
        touchAction: "none",
        willChange: "transform",
        display: "block",
      }}
    />
  )
}

export default CanvasPainter