import SignIn from '@/components/SignIn/SignIn'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In",
}

export default function Signup() {

  return (
    <SignIn />
  )
}
