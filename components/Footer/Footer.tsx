import Link from 'next/link'
import React from 'react'

const Footer = () => {

    return (
        <div className='mt-[50px] bg-[#212529] text-white'>
            <div className='h-[100px] flex flex-col justify-center items-center text-center'>
                <div className='flex gap-[5px]'>
                    <span className='cursor-pointer hover:text-slate-300'>Privacy</span>
                    <span className='cursor-pointer hover:text-slate-300'>Terms</span>
                    <span className='cursor-pointer hover:text-slate-300'>Help</span>
                    <span className='cursor-pointer hover:text-slate-300'>Support</span>
                    <span className='cursor-pointer hover:text-slate-300'>Contact</span>
                </div>
                <div className=''>
                    <span>Copyright © 2024 - </span>
                    <Link href={"/"} className='cursor-pointer hover:text-slate-300'>BloxApp.com</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer

