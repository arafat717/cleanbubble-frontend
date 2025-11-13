/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/components/shared/Loader";
import { useAcceptCounterOfferByPosterMutation, useDeclineOfferMutation } from "@/redux/api/publicePage/homepage.api";
import { useParams, useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useGetAllOffersForPosterQuery } from "@/redux/api/user/myorder.api";
import SendOfferDialog from "@/components/PendingOrder/SendOfferDialog";
import { useTranslation } from "react-i18next";

const MyPostedJobs = () => {
    const { t } = useTranslation();
    const [acceptTask] = useAcceptCounterOfferByPosterMutation();
    const id = useParams().pendingId;
    const [declineOffer] = useDeclineOfferMutation();
    const router = useRouter();
    const { data: offer, isLoading } = useGetAllOffersForPosterQuery(id);
    const offerData = offer?.data?.data;

    if (isLoading) return <Loader />;

    const handleAccept = async (offerId: string) => {
        const res = await acceptTask(offerId);
        if (res?.data) {
            toast.success(t('myPostedJobs.taskAccepted'));
            router.push('/dashboard/user/my-order');
        } else if (res?.error) {
            const errorMessage =
                (res.error as { data?: { message?: string } })?.data?.message ||
                (res.error as { message?: string })?.message ||
                t('myPostedJobs.somethingWentWrong');
            toast.error(errorMessage);
        } else {
            toast.error(t('myPostedJobs.somethingWentWrong'));
        }
    };

    const handleDeclineOffer = async (offerId: string) => {
        const res = await declineOffer(offerId);
        if (res?.data) {
            toast.success(t('myPostedJobs.offerDeclined'));
        } else {
            toast.error(t('myPostedJobs.somethingWentWrong'));
        }
    };

    return (
        <div className="max-w-full mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-2">
                <IoBagHandleOutline className="w-[54px] h-[54px]" />
                <h1 className="text-[#17171A] text-[40px] font-[500px]">{t('myPostedJobs.myPostedJobs')}</h1>
            </div>

            {/* Job Section */}
            <div className="max-w-full mx-auto p-6 space-y-8">
                <div className="space-y-4">
                    {/* <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-[600px] text-[#222]">
                        {t('myPostedJobs.exampleJob')} 
                    </h2> */}
                    {offerData?.map((job: any) => (
                        <div
                            key={job.id}
                            className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                        >
                            {/* Left Content */}
                            <div>
                                <p className="text-[14px] sm:text-[16px] font-[400px] text-[#515157]">
                                    {t('myPostedJobs.receivedCounterOffer')}
                                </p>
                                <p className="text-[16px] sm:text-[18px] font-[600px] text-[#17171A]">
                                    “{job?.post?.jobTitle} - {job?.post?.area}, {job?.post?.city}”
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    <span className="text-[14px] sm:text-[16px] font-[500px] text-[#797880]">
                                        {t('myPostedJobs.yourPrice')}:
                                    </span>{" "}
                                    <span className="text-[14px] sm:text-[16px] font-[500px] text-[#17171A]">
                                        {job?.post?.price}
                                    </span>
                                    <br />
                                    <span className="text-[14px] sm:text-[16px] font-[500px] text-[#797880]">
                                        {t('myPostedJobs.contractorOffer')}:
                                    </span>{" "}
                                    <span className="text-[14px] sm:text-[16px] font-[500px] text-[#17171A]">
                                        {job.offerPrice}
                                    </span>
                                </p>
                            </div>

                            {/* Right Actions */}
                            <div className="flex flex-col sm:items-end gap-2">
                                <button
                                    onClick={() => handleDeclineOffer(job?.id)}
                                    className="text-red-500 cursor-pointer flex items-center font-medium text-xs sm:text-sm hover:underline"
                                >
                                    {t('myPostedJobs.declineOffer')} <FiX className="ml-1" />
                                </button>
                                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-10">
                                    <button
                                        onClick={() => handleAccept(job?.id)}
                                        className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
                                    >
                                        {t('myPostedJobs.acceptOffer')}
                                    </button>
                                    <SendOfferDialog id={job?.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyPostedJobs;
