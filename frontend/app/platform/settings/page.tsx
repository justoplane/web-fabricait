import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ProfileForm } from "@/components/profile/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (!profile) {
    // Handle case where profile doesn't exist
    return (
      <div className="flex h-screen flex-col">
        <header className="border-b border-border/40 bg-background p-4">
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>
        <main className="flex-1 p-4">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Profile Error</CardTitle>
                <CardDescription>There was an error loading your profile. Please try again later.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-border/40 bg-background p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm profile={profile} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
