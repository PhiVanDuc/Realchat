import React from 'react'

export default function ReadedGroup() {
    return (
        <div className='flex flex-wrap items-center w-full gap-[5px]'>
            <div className='flex flex-wrap items-center'>
                <div className='w-[20px] aspect-square rounded-full bg-slate-300' />
                <div className='w-[20px] aspect-square rounded-full bg-slate-300 outline-[3px] outline-white outline-offset-0 -ml-[5px]' />
                <div className='w-[20px] aspect-square rounded-full bg-slate-300 outline-[3px] outline-white outline-offset-0 -ml-[5px]' />
                <div className='w-[20px] aspect-square rounded-full bg-slate-300 outline-[3px] outline-white outline-offset-0 -ml-[5px]' />
            </div>

            <p className='shrink-0 text-[13px] text-neutral-400 font-medium'>+4 đã xem</p>
        </div>
    )
}
