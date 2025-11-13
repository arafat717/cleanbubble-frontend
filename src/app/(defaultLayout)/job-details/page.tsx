"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, MapPin, Calendar, Phone, Mail } from "lucide-react"
import Image from "next/image"
import thum1 from '../../../../public/images/details1.png'
import thum2 from '../../../../public/images/details2.png'
import thum3 from '../../../../public/images/details3.png'
import thum4 from '../../../../public/images/details4.png'

export default function HouseCleaningOffer() {
    const [offerAmount, setOfferAmount] = useState("80")
    const [isPlaying, setIsPlaying] = useState(false)

    const thumbnails = [thum1, thum2, thum3, thum4]

    return (
        <div className="max-w-7xl mx-auto p-6 bg-background py-20">
            <h1 className="text-[40px] font-semibold text-center mb-8 text-[#222]">Make an offer</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:items-center mb-12">
                {/* Left Column - Images */}
                <div className="space-y-4">
                    {/* Main Image with Play Button */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        {!isPlaying ? (
                            <>
                                {/* Thumbnail */}
                                <Image
                                    src={thum1}
                                    alt="Video thumbnail"
                                    fill
                                    className="object-cover"
                                />
                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Button
                                        size="lg"
                                        onClick={() => setIsPlaying(true)}
                                        className="rounded-full w-16 h-16 cursor-pointer bg-white/90 hover:bg-white text-primary shadow-lg"
                                    >
                                        <Play className="w-6 h-6 ml-1 cursor-pointer" fill="currentColor" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <video
                                controls
                                autoPlay
                                className="w-full h-full object-cover"
                            >
                                <source src="https://videos.pexels.com/video-files/855301/855301-hd_1920_1080_25fps.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-2">
                        {thumbnails.map((thumb, index) => (
                            <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted">
                                <Image
                                    src={thumb}
                                    alt={`Interior view ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Service Details */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-[64px] font-[600px] text-[#222] mb-4">House Cleaning</h2>
                        <p className="text-[#747474] font-[400px] text-[20px] leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Tortor as egestas dignissim dictumst pharetra placerat. Mi morbi
                            ante dapibus orci vulputate ultrices morbi. Amet et odio sollicitudin ultrices ipsum justo fringilla
                            mattis molestie.
                        </p>
                    </div>

                    {/* Service Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-[18px] font-[500px] text-[#17171A]">Full Address</span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <div><span className="text-[14px] font-[600px] text-[#797880]">Street:</span> <span className="text-[14px] font-[600px] text-[#17171A]">38 The Crescent</span></div>
                                <div><span className="text-[14px] font-[600px] text-[#797880]">Area:</span> <span className="text-[14px] font-[600px] text-[#17171A]">Kensington</span></div>
                                <div><span className="text-[14px] font-[600px] text-[#797880]">City:</span> <span className="text-[14px] font-[600px] text-[#17171A]">London</span></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-[18px] font-[500px] text-[#17171A]">Date & Time</span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <div><span className="text-[14px] font-[600px] text-[#797880]">Date:</span> <span className="text-[14px] font-[600px] text-[#17171A]">12 July 2025</span></div>
                                <div><span className="text-[14px] font-[600px] text-[#797880]">Time:</span> <span className="text-[14px] font-[600px] text-[#17171A]">2:30 AM</span></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span className="text-[18px] font-[500px] text-[#17171A]">Contact Information</span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <div><span className="text-[14px] font-[600px] text-[#797880]">Name:</span> <span className="text-[14px] font-[600px] text-[#17171A]">John Doe</span></div>
                                <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span className="text-[14px] font-[600px] text-[#17171A]">example@gmail.com</span>
                                </div>
                                <div><span className="text-[14px] font-[600px] text-[#797880]">Phone:</span> <span className="text-[14px] font-[600px] text-[#17171A]">+44 7700 900123</span></div>
                            </div>
                        </div>
                        <div className="text-[64px] font-[700px] text-[#17171A] mb-6">€80</div>
                    </div>
                </div>
            </div>
            {/* Price Section */}
            <div className="pt-4">
                {/* Offer Input */}
                <div className="space-y-4">
                    <div className="relative w-full">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[28px] text-[#999] font-[700px]">
                            €
                        </span>
                        <input
                            type="number"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(e.target.value)}
                            className="w-full pl-6 pr-2 text-[28px] text-[#999] font-[700px] border-0 border-b-2 rounded-none bg-transparent focus:outline-none"
                            placeholder="120"
                        />
                    </div>


                    <Button
                        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                        size="lg"
                    >
                        Send Offer
                    </Button>
                </div>
            </div>
        </div>
    )
}
