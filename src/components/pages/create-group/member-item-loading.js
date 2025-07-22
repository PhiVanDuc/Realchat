import { Skeleton } from "@/components/ui/skeleton";

export default function MemberItemLoading() {
    return (
        <div className='flex items-center gap-[15px] p-[15px] rounded-[10px] hover:bg-neutral-100 transition-colors cursor-pointer'>
            <Skeleton className='w-[50px] aspect-square rounded-full' />
            <Skeleton className="w-full max-w-[200px] h-[24px] rounded-[5px]" />
        </div>
    )
}
