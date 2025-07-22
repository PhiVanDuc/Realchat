import OnlineStatus from '@/components/reuseable/online-status';

export default function MemberItem({ account }) {
    return (
        <div className='flex items-center gap-[15px] p-[15px] rounded-[10px] hover:bg-neutral-100 transition-colors cursor-pointer'>
            <div className='relative'>
                <span className='block w-[50px] aspect-square rounded-full bg-slate-300' />
                <OnlineStatus accountId={account?.id} />
            </div>

            <p className='text-[16px] text-neutral-600 font-semibold'>{account?.fullName}</p>
        </div>
    )
}
