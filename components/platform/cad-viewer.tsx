"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Download, CuboidIcon as Cube } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

interface CADViewerProps {
  projectId?: string
}

export function CADViewer({ projectId }: CADViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [projectData, setProjectData] = useState<any>(null)

  useEffect(() => {
    const loadProjectData = async () => {
      if (projectId) {
        setIsLoading(true)
        const supabase = createClientSupabaseClient()

        try {
          const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single()

          if (error) {
            console.error("Error loading project:", error)
          } else {
            setProjectData(data)
          }
        } catch (error) {
          console.error("Failed to load project data:", error)
        }
      }

      // Simulate loading a CAD model
      setTimeout(() => {
        setIsLoading(false)
        renderCADModel()
      }, 1500)
    }

    loadProjectData()
  }, [projectId])

  const renderCADModel = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        // Draw a simple 3D cube as a placeholder
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        // Set the center of the canvas
        const centerX = canvasRef.current.width / 2
        const centerY = canvasRef.current.height / 2

        // Draw a simple gear shape
        ctx.strokeStyle = "#3B82F6"
        ctx.lineWidth = 2

        const outerRadius = 100
        const innerRadius = 70
        const teethCount = 12

        ctx.beginPath()

        // Draw the outer gear teeth
        for (let i = 0; i < teethCount; i++) {
          const angle1 = (i / teethCount) * Math.PI * 2
          const angle2 = ((i + 0.5) / teethCount) * Math.PI * 2
          const angle3 = ((i + 1) / teethCount) * Math.PI * 2

          const outerX1 = centerX + Math.cos(angle1) * outerRadius
          const outerY1 = centerY + Math.sin(angle1) * outerRadius

          const toothX = centerX + Math.cos(angle2) * (outerRadius + 20)
          const toothY = centerY + Math.sin(angle2) * (outerRadius + 20)

          const outerX2 = centerX + Math.cos(angle3) * outerRadius
          const outerY2 = centerY + Math.sin(angle3) * outerRadius

          if (i === 0) {
            ctx.moveTo(outerX1, outerY1)
          }

          ctx.lineTo(toothX, toothY)
          ctx.lineTo(outerX2, outerY2)
        }

        ctx.closePath()
        ctx.stroke()

        // Draw the inner circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
        ctx.stroke()

        // Draw the center hole
        ctx.beginPath()
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button variant="outline" size="icon">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center">
            <Cube className="h-12 w-12 animate-pulse text-primary" />
            <p className="mt-4 text-lg">Loading CAD model...</p>
          </div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="h-full w-full" width={800} height={600} />
      )}
    </div>
  )
}
