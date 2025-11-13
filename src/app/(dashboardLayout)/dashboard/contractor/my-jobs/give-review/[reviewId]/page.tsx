/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Star, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useGetSingleOrderQuery } from "@/redux/api/user/myorder.api"
import Loader from "@/components/shared/Loader"
import { toast } from "sonner"
import { useAddReviewMutation } from "@/redux/api/publicePage/reviews.api"
import { useTranslation } from "react-i18next"

export default function ReviewInterface() {
    const { t } = useTranslation()
    const id = useParams().reviewId;
    const [addReview] = useAddReviewMutation()
    const router = useRouter()
    const { data, isLoading } = useGetSingleOrderQuery(id)
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [review, setReview] = useState("")

    const handleStarClick = (starIndex: number) => setRating(starIndex)
    const handleStarHover = (starIndex: number) => setHoveredRating(starIndex)
    const handleStarLeave = () => setHoveredRating(0)

    const handleSubmitReview = async () => {
        if (rating === 0) {
            toast.error(t("reviews.selectRating"));
            return;
        }
        if (review.trim() === "") {
            toast.error(t("reviews.writeReview"));
            return;
        }
        const reviewData = {
            rating,
            comment: review,
            reviewedId: data?.data?.jobPosterId,
            orderId: id
        };
        const res = await addReview(reviewData)
        if (res.data) {
            toast.success(t("reviews.success"))
            router.push("/")
        } else {
            let errorMessage = t("reviews.error")
            if (res.error && 'data' in res.error && (res.error as any).data?.message) {
                errorMessage = (res.error as any).data.message;
            } else if (res.error && 'message' in res.error && typeof (res.error as any).message === "string") {
                errorMessage = (res.error as any).message;
            }
            toast.error(errorMessage);
        }
    }

    if (isLoading) return <Loader />

    return (
        <div className="bg-white rounded-lg p-6 space-y-6 max-w-3xl">
            {/* Give a Review Section */}
            <div className="space-y-4">
                <h2 className="text-[40px] font-[500px] text-[#17171A]">{t("reviews.title")}</h2>

                {/* Star Rating */}
                <div className="space-y-2">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                                onMouseLeave={handleStarLeave}
                                className="p-1 transition-colors"
                            >
                                <Star
                                    className={`w-[32px] h-[32px] ${star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-[20px] font-[400px] text-[#222]">{t("reviews.ratingHint")}</p>
                </div>

                {/* Review Text Area */}
                <div className="space-y-2">
                    <label htmlFor="review" className="text-[18px] font-[600px] text-[#17171A]">{t("reviews.reviewLabel")}</label>
                    <Textarea
                        id="review"
                        placeholder={t("reviews.reviewPlaceholder")}
                        style={{ boxShadow: "none" }}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="min-h-[100px] resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmitReview}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                    {t("reviews.submit")}
                </Button>
            </div>

            {/* Job Poster's Review Section */}
            <div className="space-y-4 border-t pt-6">
                <h3 className="text-[36px] font-[500px] text-[#17171A]">{t("reviews.posterTitle")}</h3>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[#17171A] text-[18px] font-[500px]">
                        {t("reviews.posterExample")}
                    </p>
                </div>

                <Link href={`/dashboard/contractor/my-jobs/report-poster/${data?.data?.jobPosterId}`} className="cursor-pointer">
                    <button className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors">
                        <Flag className="w-[36px] h-[36px]" />
                        <span className="text-[24px] text-[#17171A] font-[600px] underline hover:text-red-900">
                            {t("reviews.report")}
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    )
}
