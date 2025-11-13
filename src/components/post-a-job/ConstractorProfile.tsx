/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const reviews = [
    {
        id: 1,
        name: "Annette Black",
        date: "18 May 2025",
        text: "Item arrived exactly as described. Seller was super responsive and even shared fit photos before confirming. Smooth transaction!",
        rating: 5,
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-profile-beard-VhcTcKSCa9atpp8zH6htoDCLic2ClL.png",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/luxury-living-room-Xo2cQarTWRTenz6uWJow6JtREyOlNX.png",
    },
    {
        id: 2,
        name: "Albert Flores",
        date: "18 May 2025",
        text: "Item arrived exactly as described. Seller was super responsive and even shared fit photos before confirming. Smooth transaction!",
        rating: 5,
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-profile-rUpuawFWX7n0H7VcyQCeN7Z7vQxD8L.png",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-bedroom-h0aRd5yv8WW3mPcAoHbnCVaxBa0jIu.png",
    },
    {
        id: 3,
        name: "Jacob Jones",
        date: "18 May 2025",
        text: "Item arrived exactly as described. Seller was super responsive and even shared fit photos before confirming. Smooth transaction!",
        rating: 5,
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/woman-profile-LdVDnTNVi8E1MicOGx3pZiCbq7EOVL.png",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-kitchen-QkUdKSihlaR9gf1rYVT46NgO3wIZlX.png",
    },
]

const projects = [
    {
        id: 1,
        title: "2 Bedroom Flat",
        price: "€80",
        location: "Manchester",
        date: "12 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-glass-office-space-with-stairs-and-pink-acc-kZu2HWAHRDNdgZE8eeSUHbsbKP5ZWQ.jpg",
        status: "completed",
    },
    {
        id: 2,
        title: "Office Cleaning",
        price: "€120",
        location: "London",
        date: "15 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-minimalist-bedroom-with-neutral-tones-and-n-3LpUlIoh9XJhXxVwikwsaNtYvdhb8S.jpg",
        status: "completed",
    },
    {
        id: 3,
        title: "Shopfront Cleaning",
        price: "€100",
        location: "Manchester",
        date: "17 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-retail-shopfront-with-wooden-elements-and-g-szHAp4SXwNcpoqG8JSA3LeQwBT6ehg.jpg",
        status: "completed",
    },
    {
        id: 4,
        title: "Garden Cleaning",
        price: "€100",
        location: "Manchester",
        date: "19 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/outdoor-garden-seating-area-with-modern-furniture--kBHBnFNgkPytjanyFtqp2U4E37LOai.jpg",
        status: "completed",
    },
    {
        id: 5,
        title: "2 Bedroom Flat",
        price: "€80",
        location: "Manchester",
        date: "21 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-glass-office-space-with-stairs-and-pink-acc-kZu2HWAHRDNdgZE8eeSUHbsbKP5ZWQ.jpg",
        status: "completed",
    },
    {
        id: 6,
        title: "Office Cleaning",
        price: "€120",
        location: "London",
        date: "23 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-glass-office-space-with-stairs-and-pink-acc-kZu2HWAHRDNdgZE8eeSUHbsbKP5ZWQ.jpg",
        status: "completed",
    },
    {
        id: 7,
        title: "Shopfront Cleaning",
        price: "€100",
        location: "Manchester",
        date: "25 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-retail-shopfront-with-wooden-elements-and-g-szHAp4SXwNcpoqG8JSA3LeQwBT6ehg.jpg",
        status: "completed",
    },
    {
        id: 8,
        title: "Garden Cleaning",
        price: "€100",
        location: "Manchester",
        date: "27 July, 2025",
        time: "2:30 AM",
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/outdoor-garden-seating-area-with-modern-furniture--kBHBnFNgkPytjanyFtqp2U4E37LOai.jpg",
        status: "completed",
    },
]

export function ContractorProfile() {
    return (
        <>
            {/* details */}
            <div className="w-full max-w-7xl mx-auto py-10">
                <div className="p-6 ">
                    {/* Header */}
                    <div className="text-start mb-10">
                        <h1 className="text-[40px] font-[500px]s text-[#222222] mb-2">Contractor Profile</h1>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-start gap-4 mb-6">
                        <Avatar className="w-16 h-16 bg-pink-500">
                            <AvatarFallback className="bg-pink-500 text-white text-xl font-semibold">S</AvatarFallback>
                        </Avatar>
                        <div className="grid grid-cols-2 justify-between w-full">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-[24px] font-[500px] text-foreground">Sophie K. Cleaning Services</h2>
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-[#747474] text-[16px] mb-3">@sophie_fashion</p>
                            </div>
                            <div>
                                <Link href={'/give-order'}><Button className="bg-[#319E60] cursor-pointer hover:bg-[#1f5f3b]  px-12 py-4 rounded-[450px]">Give an Order</Button></Link>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 max-w-3xl">
                        <p className="text-[18px] font-[400px] text-[#747474] leading-relaxed">
                            We're a family-run cleaning business with over 5 years of experience serving residential and commercial
                            clients in the West Yorkshire area. We specialise in eco-friendly solutions, flexible scheduling, and
                            guaranteed satisfaction.
                        </p>
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Matchmeet
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                50 jobs completed
                            </Badge>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mb-6">
                        <h3 className="text-[18px] font-[500px] text-[#17171A] mb-3">Services</h3>
                        <div className="flex gap-3">
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Commercial
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Residential
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Office
                            </Badge>
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h3 className="text-[24px] font-[500px] text-[#17171A] mb-3">Availability</h3>
                        <div className="flex items-center gap-2 text-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-[20px] font-[600px] text-[#17171A]">Sunday to Thursday 9:00 am to 7:00 pm</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* card  */}
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-[30px] font-[500px] text-[#222] mb-8">Completed Projects</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* Image + Rating */}
                            <div className="relative">
                                <Image
                                    src={project.image || "/placeholder.svg"}
                                    width={1000}
                                    height={600}
                                    alt={project.title}
                                    className="w-full h-[180px] object-cover"
                                />

                                {/* Rating Stars */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md px-4 py-3 border">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < project.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <CardContent className="pt-4 pb-4 px-4">
                                {/* Title & Price */}
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-[700px] text-[20px] text-[#17171A]">
                                        {project.title}
                                    </h3>
                                    <div className="text-right">
                                        <p className="text-[12px] font-[500px] text-[#9E9DA3]">Price</p>
                                        <p className="text-[32px] font-[700px] text-[#17171A]">{project.price}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3] mb-2">
                                    <MapPin className="w-4 h-4 text-cyan-600" />
                                    <span>{project.location}</span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3] mb-2">
                                    <Calendar className="w-4 h-4 text-cyan-600" />
                                    <span>Date : {project.date}</span>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3]">
                                    <Clock className="w-4 h-4 text-cyan-600" />
                                    <span>Time : {project.time}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            {/* reviews */}
            <div className="max-w-7xl mx-auto my-10">
                <h2 className="text-[40px] font-[500px] text-center mb-8 text-[#222] border-t border-b py-5">Reviews</h2>

                <div className="space-y-6">
                    {reviews.map((review) => (
                        <Card key={review.id} className="p-6 bg-white border border-gray-200 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Image
                                            src={review.avatar || "/placeholder.svg"}
                                            alt={`${review.name} avatar`}
                                            width={1000}
                                            height={1000}
                                            className="w-[60px] h-[60px] rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-[24px] font-[500px] text-[#222]">{review.name}</h3>
                                        </div>
                                    </div>

                                    <p className="text-[#222] text-[20px] font-[500px] mb-3 max-w-3xl">"{review.text}"</p>

                                    <div className="flex items-center gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <span className="text-[24px] font-[500px] text-[#222]">{review.date}</span>
                                    <Image
                                        src={review.image || "/placeholder.svg"}
                                        width={1000}
                                        height={1000}
                                        alt="Product image"
                                        className="w-40 h-40 rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}
