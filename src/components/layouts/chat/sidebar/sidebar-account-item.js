"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import OnlineStatus from '@/components/reuseable/online-status';

import { createNormalRoom } from '@/actions/chat';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SidebarAccountItem({ account }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState();

    const handleCreate = async (partnerId) => {
        if (submitting) return;

        setSubmitting(true);
        const result = await createNormalRoom(partnerId);
        setSubmitting(false);
        
        if (result?.success) {
            router.push(`/chat/${result?.data?.id}`);
            return;
        }
        else toast.error(result?.message);
    }

    return (
        <div
            className={cn(
                "flex items-center gap-[15px] p-[15px] rounded-[10px] hover:bg-neutral-100 transition-colors cursor-pointer",
                submitting ? "cursor-not-allowed" : ""
            )}
            onClick={() => { handleCreate(account?.id) }}
        >
            {
                account?.avatar ?
                (
                    <div className='shrink-0 relative w-[50px] aspect-square rounded-full bg-neutral-300'>
                        <Image
                            src={account?.avatar}
                            alt={`Avatar ${account?.full_name}`}
                            fill
                            sizes='50'
                            className='object-center object-cover rounded-full'
                        />
                        <OnlineStatus accountId={account?.id}/>
                    </div>
                ) :
                (<span className="shrink-0 w-[50px] aspect-square rounded-full bg-neutral-300" />)
            }

            <p className='text-[16px] text-neutral-600 font-semibold'>{account?.full_name}</p>
        </div>
    )
}
