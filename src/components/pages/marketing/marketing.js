import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Medal } from "lucide-react";

export default function Marketing() {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
                <div className="flex items-center border border-amber-100 shadow-sm p-4 py-[12px] bg-amber-100 text-[14px] text-amber-700 font-semibold rounded-full uppercase mb-[100px]">
                    <Medal className="h-6 w-6 mr-2" />
                    Được tin dùng hàng đầu
                </div>

                <h1 className="text-2xl md:text-5xl font-bold text-center mb-6">
                    Giao tiếp nhóm dễ dàng hơn bao giờ hết
                </h1>

                <div className="text-xl md:text-4xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 p-2 pt-[16px] rounded-md pb-4 w-fit">
                    nhanh chóng & tiện lợi
                </div>
            </div>

            <div className="text-sm md:text-[16px] text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
                Kết nối, nâng cao, quản lý công việc và nâng cao hiệu suất. Từ văn phòng đến làm việc từ xa giúp bạn và đội nhóm hoàn thành mọi mục tiêu theo cách riêng.
            </div>

            <Button className="mt-6" size="lg">
                <Link href="/sign-up">Trải nghiệm miễn phí</Link>
            </Button>
        </div>
    )
}
