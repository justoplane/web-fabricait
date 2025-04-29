import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">About Fabricait</h1>
            <p className="mb-10 text-xl text-muted-foreground">
              We're on a mission to revolutionize CAD design with artificial intelligence
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight" id="story">
              Our Story
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-lg">
                  Fabricait was born from a simple observation: CAD design is powerful but often inaccessible to those
                  without specialized training.
                </p>
                <p className="mb-4 text-lg">
                  Our founders, a team of engineers and AI researchers, set out to bridge this gap by creating an
                  intuitive platform that could translate natural language into precise CAD models.
                </p>
                <p className="text-lg">
                  Since our launch in 2023, we've been helping engineers, designers, and creators of all skill levels
                  bring their ideas to life faster than ever before.
                </p>
              </div>
              <div className="rounded-lg border border-border/40 bg-card overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Fabricait Team"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" id="team">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Meet Our Team</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Alex Morgan",
                  role: "CEO & Co-Founder",
                  bio: "Former mechanical engineer with 10+ years of experience in CAD design and product development.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Priya Sharma",
                  role: "CTO & Co-Founder",
                  bio: "AI researcher with a PhD in machine learning and computer vision from Stanford University.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "David Chen",
                  role: "Head of Engineering",
                  bio: "Full-stack developer with expertise in 3D rendering and computational geometry.",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg border border-border/40 bg-card p-6 text-center"
                >
                  <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-medium">{member.name}</h3>
                  <p className="mb-4 text-sm text-primary">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Who We Serve</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-medium">Engineers & Designers</h3>
                <p className="text-muted-foreground">
                  Professional engineers and designers use Fabricait to accelerate their workflow, quickly prototype
                  ideas, and explore design variations without manual CAD work.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-medium">Startups & Innovators</h3>
                <p className="text-muted-foreground">
                  Entrepreneurs and innovators with limited CAD experience use Fabricait to bring their product ideas to
                  life without the steep learning curve of traditional CAD software.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-medium">Educational Institutions</h3>
                <p className="text-muted-foreground">
                  Schools and universities use Fabricait to teach engineering concepts, allowing students to focus on
                  design principles rather than software technicalities.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-medium">Manufacturing Companies</h3>
                <p className="text-muted-foreground">
                  Manufacturing firms use Fabricait to streamline communication between design and production teams,
                  reducing errors and accelerating the development cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" id="contact">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Get in Touch</h2>
            <p className="mb-8 text-lg text-muted-foreground">Have questions or want to learn more about Fabricait?</p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border border-border/40 bg-card p-6">
                <Mail className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-medium">Email</h3>
                <p className="text-muted-foreground">info@fabricait.com</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-border/40 bg-card p-6">
                <Github className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-medium">GitHub</h3>
                <p className="text-muted-foreground">github.com/fabricait</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-border/40 bg-card p-6">
                <Linkedin className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-medium">LinkedIn</h3>
                <p className="text-muted-foreground">linkedin.com/company/fabricait</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
