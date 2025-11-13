/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const PaymentDetails = ({ courseData }: { courseData: any }) => {
  const params = useSearchParams().get("type");

  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Billing Details</h2>
        <div className="space-y-3">
          <Image
            src={
              params === "service" ? courseData?.image : courseData?.thumbnail
            }
            alt="Course thumbnail"
            className="w-20 h-20 rounded-lg"
            height={200}
            width={200}
          />
          <div className="flex-1">
            <h3 className="font-medium text-white">
              {params === "service"
                ? courseData?.projectName
                : courseData?.courseName}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Payment Details</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Course Price</span>
            <span>£{courseData?.price}</span>
          </div>

          <hr className="border-gray-700" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total payment</span>
            <span>£{courseData?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
