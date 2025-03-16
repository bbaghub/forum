import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Topbar() {
  return (
    <nav className='topbar'>
      <Link href="/" className='flex items-center gap-4'>
        <Image 
        src="/assets/BBAGLOGO.svg" 
        alt="logo" 
        width={50} 
        height={24} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Blockchain Builders Association</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                src="/assets/logout.svg"
                alt="logout"
                width={50}
                height={50}
                />
              </div>  
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
        appearance={{
          elements:{
            organisationSwithcerTrigger:"py-2 px-4"
          }
        }}
        /> 
      </div>
    </nav>
  )
}

export default Topbar