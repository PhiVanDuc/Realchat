import { cn } from "@/libs/utils";

export default function Error({ message = "", className = "" }) {
    const [status, error] = message.split(",");

    return (
        <div className={cn(
            "p-[20px]",
            className
        )}>
            <div className="flex flex-col items-center p-[20px] rounded-[10px] bg-neutral-100">
                <p className="text-[20px] text-neutral-400 font-bold">{status}</p>
                <p className="text-[15px] text-neutral-500 font-medium">{error}</p>
            </div>
        </div>
    )
}
