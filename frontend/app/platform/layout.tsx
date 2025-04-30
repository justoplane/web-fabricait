import type React from "react"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { PlatformSidebar } from "@/components/platform/sidebar"

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
    <div className="flex h-[calc(100vh-4rem)]">
      <PlatformSidebar />
      <div className="relative flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
