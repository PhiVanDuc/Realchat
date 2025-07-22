import React from 'react'

export default function Error({ message = "" }) {
    const [status, mess] = message.split(",")

    return (
        <div className='w-full p-[10px]'>
            <div className='w-full flex flex-col items-center justify-center gap-[4px] p-[10px] bg-neutral-50 rounded-[10px]'>
                <p className='text-[18px] text-neutral-600 font-semibold'>{status}</p>
                <p className='text-[15px] text-neutral-400 font-medium text-center'>{mess}</p>
            </div>
        </div>
    )
}
