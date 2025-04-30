import { NextRequest, NextResponse } from 'next/server'

// Replace this with your actual backend URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    // Await the params to ensure they're properly resolved
    const { projectId } = await Promise.resolve(params)
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      )
    }

    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/stl/${projectId}`, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/sla',
      },
    })

    console.log('Backend Response Status:', response.status) // Debug log

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend Error:', errorText) // Debug log
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    // Get the blob from the response
    const blob = await response.blob()

    // Create a new response with the blob
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/sla',
        'Content-Disposition': `attachment; filename="${projectId}.stl"`,
      },
    })
  } catch (error) {
    console.error('Error fetching STL:', error)
    return NextResponse.json(
      { error: 'Failed to fetch STL file' },
      { status: 500 }
    )
  }
} 