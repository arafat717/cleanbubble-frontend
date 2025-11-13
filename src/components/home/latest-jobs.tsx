import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
import Image from "next/image"

const jobs = [
  {
    id: 1,
    title: "Residential Cleaning",
    location: "Manhattan, NY",
    price: "$80",
    time: "2 hours",
    image: "/modern-residential-interior-living-room.png",
  },
  {
    id: 2,
    title: "Office Cleaning",
    location: "Brooklyn, NY",
    price: "$120",
    time: "3 hours",
    image: "/modern-office-workspace-with-desks.png",
  },
  {
    id: 3,
    title: "Restaurant Cleaning",
    location: "Queens, NY",
    price: "$150",
    time: "4 hours",
    image: "/restaurant-kitchen-commercial-space.png",
  },
  {
    id: 4,
    title: "Apartment Cleaning",
    location: "Bronx, NY",
    price: "$100",
    time: "2.5 hours",
    image: "/apartment-interior-2.png",
  },
]

export default function LatestJobs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Latest Cleaning Jobs</span>
          <h2 className="text-3xl font-bold text-foreground mt-2">
            LATEST CLEANING <span className="text-primary">JOBS NEAR YOU</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="border border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={job.image || "/placeholder.svg"}
                  alt={job.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {job.price}
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">{job.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {job.time}
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  )
}
