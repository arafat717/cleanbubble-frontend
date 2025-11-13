import MyJobs from "@/components/dashboard/contractor/MyJobs";
import { T } from "@/utils/translations";
import { IoBagHandleOutline } from "react-icons/io5";



const page = () => {

    return (
        <div className="max-w-full mx-auto px-1 md:px-8">
            <div className="flex  items-start sm:items-center justify-between py-4 px-4 sm:px-6 lg:px-10 max-w-full gap-4">
                {/* Left: Title */}
                <div className="flex items-center gap-2">
                    <IoBagHandleOutline className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 text-[#17171A]" />
                    <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-[#17171A]">
                        <T>My Jobs</T>
                    </h1>
                </div>
            </div>
            <MyJobs></MyJobs>
        </div>
    );
};

export default page;