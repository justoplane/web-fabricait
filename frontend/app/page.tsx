import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Cpu, Layers, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Transform Text into <span className="text-primary">CAD Models</span> with AI
            </h1>
            <p className="mb-10 text-xl text-muted-foreground">
              Fabricait uses advanced AI to generate precise CAD files from simple text descriptions, revolutionizing
              the design process for engineers and creators.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/product">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Powerful Features</h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Our AI-powered platform offers everything you need to streamline your CAD workflow
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Cpu className="h-10 w-10 text-primary" />,
                title: "AI-Powered Generation",
                description: "Generate complex CAD models from simple text descriptions",
              },
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Parametric Control",
                description: "Fine-tune dimensions and properties with natural language",
              },
              {
                icon: <Layers className="h-10 w-10 text-primary" />,
                title: "Multi-Format Export",
                description: "Export to STL, STEP, OBJ and other popular CAD formats",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Real-Time Collaboration",
                description: "Work together with your team in real-time on designs",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg border border-border/40 bg-card p-6 text-center"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">See Fabricait in Action</h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Watch how easy it is to create complex CAD models with natural text input
            </p>
          </div>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-border/40 bg-card shadow-lg">
            <div className="aspect-video bg-muted">
              <div className="flex h-full items-center justify-center">
                <Image
                  src="/images/fusion360-design.gif"
                  alt="Fabricait Demo"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
            <p className="mb-12 text-lg text-muted-foreground">Hear from engineers and designers who use Fabricait</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Fabricait has cut our design time in half. What used to take days now takes hours.",
                author: "Sarah Chen",
                role: "Mechanical Engineer",
              },
              {
                quote:
                  "The accuracy of the models generated from text is incredible. It's like having an AI design assistant.",
                author: "Michael Rodriguez",
                role: "Product Designer",
              },
              {
                quote:
                  "As someone who isn't a CAD expert, Fabricait has made it possible for me to create professional designs.",
                author: "Jamie Wilson",
                role: "Startup Founder",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg border border-border/40 bg-card p-6">
                <p className="mb-4 text-lg italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border border-border/40 bg-card p-8 text-center shadow-lg">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Transform Your Design Process?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of engineers and designers using Fabricait today
            </p>
            <Link href="/signup">
              <Button size="lg">Get Started for Free</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
