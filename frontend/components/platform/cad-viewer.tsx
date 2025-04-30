"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Download, CuboidIcon as Cube } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { STLLoader } from "three/addons/loaders/STLLoader.js"

interface CADViewerProps {
  projectId?: string
}

async function fetchSTLFile(projectId: string): Promise<string> {
  try {
    const supabase = createClientSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      throw new Error('No active session')
    }

    const response = await fetch(`/api/stl/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Accept': 'application/sla',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch STL file')
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error fetching STL:', error)
    throw error
  }
}

function Model({ url }: { url: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const loader = new STLLoader()
    loader.load(url, (geometry: THREE.BufferGeometry) => {
      geometry.center()
      geometry.computeVertexNormals()
      setGeometry(geometry)
    })

    // Cleanup the blob URL when component unmounts
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [url])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  if (!geometry) return null

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#3B82F6" />
    </mesh>
  )
}

function Scene({ stlUrl }: { stlUrl: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model url={stlUrl} />
      <OrbitControls />
    </>
  )
}

export function CADViewer({ projectId }: CADViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [stlUrl, setStlUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadModel = async () => {
      if (!projectId) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const url = await fetchSTLFile(projectId)
        setStlUrl(url)
      } catch (err) {
        setError('Failed to load model')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadModel()
  }, [projectId])

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
      ) : error ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : stlUrl ? (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene stlUrl={stlUrl} />
        </Canvas>
      ) : null}
    </div>
  )
}
