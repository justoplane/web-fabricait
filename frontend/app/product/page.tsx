import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Fabricait Product</h1>
            <p className="mb-10 text-xl text-muted-foreground">
              Discover how our AI-powered platform transforms text into precise CAD models
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Key Features</h2>
            <div className="grid gap-12">
              {[
                {
                  title: "Natural Language to CAD",
                  description:
                    "Describe your design in plain English, and watch as our AI generates a precise 3D model in seconds.",
                  image: "/images/cad-model.png",
                },
                {
                  title: "Real-time Editing",
                  description:
                    "Refine your design through conversation. Ask the AI to adjust dimensions, add features, or modify components.",
                  image: "/images/realtime.png",
                },
                {
                  title: "Multi-format Export",
                  description:
                    "Export your designs in industry-standard formats including STL, STEP, OBJ, and more for 3D printing or further editing.",
                  image: "/images/formats.png",
                },
                {
                  title: "Collaboration Tools",
                  description:
                    "Share designs with team members, collaborate in real-time, and maintain version history of all your projects.",
                  image: "/images/collaboration.jpg",
                },
              ].map((feature, index) => (
                <div key={index} className="grid gap-8 md:grid-cols-2">
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground">{feature.description}</p>
                  </div>
                  <div
                    className={`${index % 2 === 1 ? "md:order-1" : ""} rounded-lg border border-border/40 bg-card overflow-hidden`}
                  >
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" id="pricing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Pricing Plans</h2>
            <p className="mb-12 text-lg text-muted-foreground">Choose the plan that's right for you</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$19",
                description: "Perfect for individuals and small projects",
                features: [
                  "10 CAD generations per month",
                  "Export to STL format",
                  "Basic editing capabilities",
                  "Email support",
                ],
              },
              {
                name: "Professional",
                price: "$49",
                description: "Ideal for professionals and small teams",
                features: [
                  "50 CAD generations per month",
                  "Export to all formats",
                  "Advanced editing capabilities",
                  "Collaboration for up to 3 users",
                  "Priority support",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations with advanced needs",
                features: [
                  "Unlimited CAD generations",
                  "Export to all formats",
                  "Advanced editing capabilities",
                  "Unlimited team collaboration",
                  "API access",
                  "Dedicated support",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`flex flex-col rounded-lg border ${
                  plan.highlighted
                    ? "border-primary bg-gradient-to-b from-primary/10 to-background"
                    : "border-border/40 bg-card"
                } p-8`}
              >
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="mb-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="mb-6 text-muted-foreground">{plan.description}</p>
                <ul className="mb-8 flex-1 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20" id="faq">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How accurate are the CAD models generated by Fabricait?",
                  answer:
                    "Fabricait's AI has been trained on millions of CAD models and engineering specifications. The accuracy of generated models depends on the clarity and detail of your text description, but our system typically produces models with dimensional accuracy within industry standards. You can always refine the model through conversation with the AI.",
                },
                {
                  question: "What CAD formats does Fabricait support?",
                  answer:
                    "Fabricait supports exporting to all major CAD formats including STL, STEP, OBJ, IGES, and more. This ensures compatibility with virtually any CAD software or 3D printer you might be using.",
                },
                {
                  question: "Can I collaborate with my team on Fabricait?",
                  answer:
                    "Yes! Our Professional and Enterprise plans include collaboration features that allow multiple team members to work on the same project. You can share designs, comment on specific features, and maintain version history.",
                },
                {
                  question: "Do I need CAD experience to use Fabricait?",
                  answer:
                    "No CAD experience is required. Fabricait is designed to be accessible to everyone, from CAD experts to complete beginners. Simply describe what you want to create in plain language, and our AI will handle the technical details.",
                },
                {
                  question: "Is my data secure on Fabricait?",
                  answer:
                    "Yes, we take data security very seriously. All designs and conversations are encrypted both in transit and at rest. We do not use your designs to train our AI models without explicit permission, and you retain full ownership of all intellectual property you create on our platform.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border border-border/40 bg-card p-8 text-center shadow-lg">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Transform Your Design Process?</h2>
            <p className="mb-8 text-lg text-muted-foreground">Start creating CAD models from text today</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg">Sign Up Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
