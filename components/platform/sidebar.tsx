"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Settings, Users, LogOut, FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"

export function PlatformSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border/40 bg-background">
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 overflow-auto p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/platform">
              <Button variant={isActive("/platform") ? "secondary" : "ghost"} className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/platform/projects">
              <Button variant={isActive("/platform/projects") ? "secondary" : "ghost"} className="w-full justify-start">
                <FolderKanban className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/platform/documents">
              <Button
                variant={isActive("/platform/documents") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/platform/users">
              <Button variant={isActive("/platform/users") ? "secondary" : "ghost"} className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/platform/settings">
              <Button variant={isActive("/platform/settings") ? "secondary" : "ghost"} className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="border-t border-border/40 p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
