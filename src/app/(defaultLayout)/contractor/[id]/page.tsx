
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, CheckCircle } from "lucide-react"
import Image from "next/image"


export default function ContractorProfilePage() {
  const completedProjects = [
    {
      id: 1,
      title: "2 Bedroom Flat",
      price: "€80",
      rating: 5,
      date: "2 days ago",
      image: "/modern-apartment.png",
    },
    {
      id: 2,
      title: "Office Cleaning",
      price: "€120",
      rating: 5,
      date: "1 week ago",
      image: "/modern-office.png",
    },
    {
      id: 3,
      title: "Shopfront Cleaning",
      price: "€100",
      rating: 4,
      date: "2 weeks ago",
      image: "/retail-store-interior.png",
    },
    {
      id: 4,
      title: "Garden Cleaning",
      price: "€100",
      rating: 5,
      date: "3 weeks ago",
      image: "/garden-patio-area.png",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Annette Black",
      date: "18 May 2025",
      rating: 5,
      comment:
        "Item arrived exactly as described. Seller was super responsive and even shared fit photos before confirming. Smooth transaction!",
      image: "/professional-woman-headshot.png",
    },
    {
      id: 2,
      name: "Albert Flores",
      date: "18 May 2025",
      rating: 5,
      comment:
        "Item arrived exactly as described. Seller was super responsive and even shared fit photos before confirming. Smooth transaction!",
      image: "/professional-man-headshot.png",
    },
    {
      id: 3,
      name: "Jacob Jones",
      date: "18 May 2025",
      rating: 5,
      comment:
        "Item arrived exactly as described. Seller was super responsive and even shared fit photos before confirming. Smooth transaction!",
      image: "/professional-headshot-person.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">


      <main className="py-20">
        <div className="container mx-auto px-4 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-8">Contractor Profile</h1>

            {/* Profile Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/professional-woman-headshot.png" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">Sophie K. Cleaning Services</h2>
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Sophie fashion</p>
                  <p className="text-muted-foreground max-w-2xl mb-4">
                    We&#39;re a family-run cleaning business with over 5 years of experience serving residential and
                    commercial clients in the West Yorkshire area. We specialise in eco-friendly solutions, flexible
                    scheduling, and exceptional customer service.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm font-medium ml-1">4.8</span>
                    </div>
                    <span className="text-sm text-muted-foreground">23 jobs completed</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Give an Order</Button>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Residential
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Commercial
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Office
                </Badge>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Availability</h3>
              <p className="text-muted-foreground">Sunday to Thursday 9:00 am to 7:00 pm</p>
            </div>
          </div>

          {/* Completed Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Completed Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {completedProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded text-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= project.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{project.title}</h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{project.date}</span>
                      <span className="font-semibold text-foreground">{project.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Duplicate row for demonstration */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {completedProjects.map((project) => (
                <Card key={`${project.id}-2`} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded text-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= project.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{project.title}</h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{project.date}</span>
                      <span className="font-semibold text-foreground">{project.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                      <Image
                        src="/interior-room-after-cleaning.png"
                        alt="Review photo"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}
