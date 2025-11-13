'use client'
import { AlertTriangle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCancelMySubsCribtionMutation, useGetMySubsCribtionQuery } from "@/redux/api/admin/repost.api"
import Loader from "@/components/shared/Loader"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const SubscriptionNotice = () => {
    const { t } = useTranslation()
    const { data, isLoading } = useGetMySubsCribtionQuery('')
    const [cancelPlan] = useCancelMySubsCribtionMutation()
    const subscription = data?.data[0]

    const handleCancel = async () => {
        const res = await cancelPlan('')
        if (res?.data) {
            toast.success(t("subscriptionNotice.planCanceled"))
        } else {
            toast.error(t("subscriptionNotice.somethingWentWrong"))
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const calculateDaysLeft = (endDate: string) => {
        const end = new Date(endDate)
        const today = new Date()
        const diffTime = end.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays > 0 ? diffDays : 0
    }

    if (isLoading) return <Loader />

    if (!subscription) {
        return (
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-500">{t("subscriptionNotice.noData")}</p>
            </div>
        )
    }

    const daysLeft = calculateDaysLeft(subscription.endDate)

    return (
        <>
            {data?.data?.length ? (
                <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-gray-600" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-900">
                            {t("subscriptionNotice.subscription")}
                        </h2>
                    </div>

                    {/* Warning Message */}
                    <div className="flex items-start gap-3 mb-6">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">
                                {t("subscriptionNotice.accessExpiring")}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {t("subscriptionNotice.continueFeatures")}
                            </p>
                        </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="space-y-3 mb-6 text-sm">
                        <div>
                            <span className="text-gray-600">{t("subscriptionNotice.plan")} : </span>
                            <span className="font-medium text-gray-900">
                                {subscription.subscriptionOffer.planName}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t("subscriptionNotice.expirationDate")} : </span>
                            <span className="font-medium text-gray-900">
                                {formatDate(subscription.endDate)}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t("subscriptionNotice.daysLeft")} : </span>
                            <span className="font-medium text-gray-900">{daysLeft} {t("subscriptionNotice.days")}</span>
                        </div>
                    </div>

                    {/* Cancel Button */}
                    <Button
                        onClick={handleCancel}
                        className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-full py-3"
                    >
                        {t("subscriptionNotice.cancelPlan")}
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <h1>{t("subscriptionNotice.noActiveSubscription")}</h1>
                </div>
            )}
        </>
    )
}

export default SubscriptionNotice
