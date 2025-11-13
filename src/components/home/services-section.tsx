import { Card, CardContent } from "@/components/ui/card"
import { Home, Building, Briefcase, Trees } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Top homes, flats, and apartments. Keep your living space fresh and spotless.",
    color: "text-blue-600",
  },
  {
    icon: Building,
    title: "Commercial Cleaning",
    description: "Perfect for shops, restaurants, and buildings - high standard cleaning that reflects your brand.",
    color: "text-green-600",
  },
  {
    icon: Briefcase,
    title: "Office Cleaning",
    description: "Maintain a tidy, productive workspace with routine or scheduled cleaning.",
    color: "text-purple-600",
  },
  {
    icon: Trees,
    title: "Outdoor & Garden Cleaning",
    description: "Clean up outdoor areas, patios, driveways, or garden spaces - more than just maintenance.",
    color: "text-orange-600",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Top Job Categories</span>
          <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">
            CLEANING <span className="text-primary">SERVICES</span> PEOPLE ARE LOOKING FOR
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                    <service.icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
