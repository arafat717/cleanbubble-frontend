import MyOrder from "@/components/dashboard/user/my-order";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";



const page = () => {

    return (
        <div className="max-w-full mx-auto px-1 md:px-4">
            <div className="flex  items-start sm:items-center justify-between py-4 px-4 sm:px-6 lg:px-10 max-w-full gap-4">
                {/* Left: Title */}
                <div className="flex items-center gap-2">
                    <IoBagHandleOutline className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 text-[#17171A]" />
                    <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-[#17171A]">
                        My Posted Jobs
                    </h1>
                </div>

                {/* Right: Button */}
                <Link href={'/dashboard/user/create-new-post'}>
                    <Button
                        variant="outline"
                        className="flex items-center rounded-[40px] cursor-pointer text-[#222] text-sm sm:text-lg lg:text-[20px] font-medium gap-2 bg-transparent px-6 sm:px-12 lg:px-20 py-3 sm:py-4 lg:py-6"
                    >
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                        Create New
                    </Button>
                </Link>
            </div>
            <MyOrder></MyOrder>
        </div>
    );
};

export default page;