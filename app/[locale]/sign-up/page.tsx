import SignUp from '@/components/SignUp/SignUp';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function Signup() {
  return <SignUp />;
}