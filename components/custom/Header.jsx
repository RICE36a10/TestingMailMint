"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import SignInButton from './SignInButton'
import { useUserDetail } from '@/app/provider'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

function Header() {
  const { userDetail } = useUserDetail();
  return (
    <div className='flex justify-between items-center
    p-4 shadow-sm px-10'>
      <Image src={'/logo.svg'} alt='logo'
        width={180}
        height={140}
      />

      <div className='flex gap-3 items-center'>
        {userDetail?.email ? (
          <>
            <Link href={'/dashboard'}>
              <Button>Dashboard</Button>
            </Link>
            <Image src={userDetail?.picture} alt='user' width={35} height={35}
              className='rounded-full'
            />
          </>
        ) : (
          <SignInButton />
        )}
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Header
