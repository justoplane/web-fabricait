"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createClientSupabaseClient } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: false,
  })

  const supabase = createClientSupabaseClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isPublic: checked,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a project",
          variant: "destructive",
        })
        return
      }

      const { data, error } = await supabase
        .from("projects")
        .insert({
          name: formData.name,
          description: formData.description,
          is_public: formData.isPublic,
          user_id: user.id,
        })
        .select()

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Project created successfully",
      })

      // Navigate to the new project
      if (data && data[0]) {
        router.push(`/platform/projects/${data[0].id}`)
      } else {
        router.push("/platform/projects")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-border/40 bg-background p-4">
        <h1 className="text-2xl font-bold">New Project</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-2xl">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Create a new CAD project</CardTitle>
                <CardDescription>Fill in the details below to create your new project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="My Awesome CAD Project"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="A brief description of your project"
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="is-public" checked={formData.isPublic} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="is-public">Make project public</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
