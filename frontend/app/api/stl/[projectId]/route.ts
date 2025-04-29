import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Replace this with your actual backend URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    // Create Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession()

    if (authError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = params

    // Make request to your backend with the user's session token
    const response = await fetch(`${BACKEND_URL}/api/stl/${projectId}`, {
      headers: {
        'Accept': 'application/sla',
        'Authorization': `Bearer ${session.access_token}`,
      },
    })

    if (!response.ok) {
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