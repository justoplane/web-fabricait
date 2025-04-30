import { redirect } from "next/navigation"

export default function PlatformPage() {
  // Redirect to projects page as we no longer have a dashboard
  redirect("/platform/projects")
}