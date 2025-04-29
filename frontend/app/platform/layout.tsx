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

  return ( // Yikes, you probably shouldn't manually set the height like this \_O_/
    <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 70px)' }}>
      <PlatformSidebar />
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
