import React from 'react'
import Logo from './logo'
import { Button } from './ui/button'
import Link from 'next/link'

function NavBar() {
  return (
    <div className='fixed z-50 w-full px-10 py-4 items-center justify-between flex'>
        <Link href={'/'}>
            <div className="flex items-center justify-center gap-2">
                <Logo size='sm'/>
                <h1 className='text-xl font-semibold'>Snipr</h1>
            </div>
        </Link>
            <div className="">
                <Button>
                    Signin
                </Button>
            </div>
    </div>
  )
}

export default NavBar