"use client";
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Wrapper = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const token = localStorage.getItem("token");
    useEffect(() => {
     if (!token) {
            router.push("/login");
     }
    },[token , router])
    if (!token) return null;
  return (
    <>
      {children}
    </>
  )
}

export default Wrapper
