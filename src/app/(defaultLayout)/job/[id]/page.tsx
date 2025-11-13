
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Calendar } from "lucide-react"
import Image from "next/image"


export default function JobDetailsPage() {
  return (
    <div className="min-h-screen bg-background">


      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Make an offer</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Job Images */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src="/elegant-purple-living-room-interior.png"
                  alt="House cleaning job"
                  width={800}
                  height={256}
                  className="w-full h-64 object-cover rounded-lg"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-l-gray-800 border-y-4 border-y-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`/purple-interior-room-.png?height=100&width=100&query=purple interior room ${i}`}
                    alt={`Room view ${i}`}
                    width={100}
                    height={80}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">House Cleaning</h2>
                <p className="text-muted-foreground mb-6">
                  Lorem ipsum dolor sit amet consectetur. Tortor ut egestas dignissim dictumst phasellus. Mi morbi aspe
                  dapibus enim vulputate ultrices imperdiet. Amet ut solut sollicitudin ultrices justo fringilla mattis
                  mauris.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    Full Address
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="font-medium">Street: 28 The Crescent</div>
                    <div>Area: Kensington</div>
                    <div>City: London</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    Date & Time
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Date: 12 July, 2025</div>
                    <div>Time: 2:30 AM</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Phone className="w-4 h-4" />
                    Contact Information
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Name: John Doe</div>
                    <div>Email: example@gmail.com</div>
                    <div>Phone: +44 7700 900123</div>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <span className="text-4xl font-bold text-foreground">€80</span>
              </div>

              <div>
                <Input placeholder="€120" className="text-center text-lg font-medium mb-4" />
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                  Send Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}
