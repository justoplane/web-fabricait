import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CADViewer } from "@/components/platform/cad-viewer"
import Link from "next/link"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { ChatDrawer } from "@/components/platform/chat-drawer"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Handle params asynchronously
  const projectId = await Promise.resolve(params.id)
  
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: project } = await supabase.from("projects").select("*").eq("id", projectId).single()

  if (!project) {
    notFound()
  }

  // Check if user has access to this project
  if (project.user_id !== session.user.id && !project.is_public) {
    // User doesn't have access to this project
    redirect("/platform/projects")
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-border/40 bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/platform/projects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{project.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          <CADViewer projectId={projectId} />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <ChatDrawer />
        </div>
      </main>
    </div>
  )
}
