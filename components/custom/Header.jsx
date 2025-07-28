"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import SignInButton from './SignInButton'
import { useUserDetail } from '@/app/provider'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'

function Header() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useUserDetail();

  const onSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    setUserDetail(null);
    router.push('/');
  }

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='p-0'>
                  <Image src={userDetail?.picture} alt='user' width={35} height={35}
                    className='rounded-full' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={onSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
