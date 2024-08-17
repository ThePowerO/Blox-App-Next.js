import React from 'react'
import { Metadata } from 'next';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Privacy Plicy",
}


type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];
 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}


export default function page({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <article className='p-6 flex flex-col divide-y divide-gray-300 gap-5'>
      <h1 className='text-3xl font-bold'>
        Combosfy - Privacy Policy
      </h1>
      
      <ul className='pt-7 flex flex-col gap-4'>
        <li>
          <p>
            At Combosfy, accessible from https://combosfy.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is
            collected and recorded by Combosfy and how we use it.
            <br />
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to
            contact us.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Cookies and Web Beacons</span>
          <p>
            Like any other website, Blox Fruits Values uses 'cookies'. These cookies are used to store information including
            visitor's preferences, and the pages on the website that the visitor accessed or visited. The information is used
            to optimize the user's experience by customizing our web page content based on visitor's browser type and/or
            other information.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Online Privacy Policy Only</span>
          <p>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards
            to the information that they shared and/or collect in Blox Fruits Values. This policy is not applicable to any
            information collected offline or via channels other than this website.
          </p>
        </li>
        <li>
          <span className='text-xl underline'>Children's Information</span>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and
            guardians to observe, participate in, and/or monitor and guide their online activity.
            <br />
            <br />
            Blox Fruits Values does not knowingly collect any Personal Identifiable Information from children under the age
            of 13. If you think that your child provided this kind of information on our website, we strongly encourage you
            to contact us immediately and we will do our best efforts to promptly remove such information from our records.
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
          <span className='text-xl underline'>Consent</span>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.          </p>
        </li>
      </ul>
    </article>
  )
}
