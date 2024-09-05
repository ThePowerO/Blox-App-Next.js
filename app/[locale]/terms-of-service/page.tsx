import React from 'react'
import { Metadata } from 'next';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Terms of Service",
}


type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export default function page({ params }: paramsProps) {
  return (
    <article className='p-6 flex flex-col divide-y divide-gray-300 gap-5'>
      <h1 className='text-3xl font-bold'>
        Terms of Service
      </h1>
      
      <ul className='pt-7 flex flex-col gap-4'>
        <li>
          <span className='text-xl underline'>Acceptance of Terms</span>
          <p>
            When accessing and utilizing combosfy.com, you ("you" or "your") acknowledge your agreement to abide by these
            Terms of Service. These terms are binding and cover your use of the Site, including any associated media platforms
            or applications.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>User Accounts</span>
          <p>
            a. Account Creation: You may create an account to access additional features on our website. You are responsible
            for maintaining the confidentially of your account credentials.
            <br />
            b. Account Termination: We reserve the right to suspend or terminate accounst that violate our TOS or engage
            in unauthorized or illegal activities.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Restricted Activities</span>
          <p>
            Your use of the site is limited to its intended purposes and may not involve commercial activities unless explicitly
            authorized by us.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Intellectual Property</span>
          <p>
            All content, trademarks, and other intellectual property on combosfy.com are the property of this website 
            or its licensors. You may not use, reproduce, or distribute any content from our website without permission.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Limitation of Liability</span>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising from your use of 
            combosfy.com.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Contact Details</span>
          <p>
            For complaints or inquiries about the Site, contact us at: combosfysupport@gmail.com
          </p>
        </li>
      </ul>
    </article>
  )
}
