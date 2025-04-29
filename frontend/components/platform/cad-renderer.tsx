import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Download, CuboidIcon as Cube } from "lucide-react"
interface CADViewerProps {
  projectId?: string
}
export default function CADRenderer({ projectId }: CADViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [projectData, setProjectData] = useState<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
        //renderCADModel()
      }, 1500)
    }

    loadProjectData()
  }, [projectId])

  function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)



    useFrame((state, delta) => (ref.current.rotation.x += delta))
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
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
        <Canvas className="flex h-full w-full items-center justify-center">
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      )}
    </div>
    // <Canvas className="w-full h-full">
    //   <ambientLight intensity={Math.PI / 2} />
    //   <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    //   <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    //   <Box position={[-1.2, 0, 0]} />
    //   <Box position={[1.2, 0, 0]} />
    // </Canvas>
  )
}