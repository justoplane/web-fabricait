import type React from "react"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { PlatformSidebar } from "@/components/platform/sidebar"
import { ChatDrawer } from "@/components/platform/chat-drawer"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <PlatformSidebar />
        <div className="flex-1 overflow-auto">{children}</div>
        <ChatDrawer />
      </div>
    </SidebarProvider>
  )
}
