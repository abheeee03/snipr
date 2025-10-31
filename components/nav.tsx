import React from 'react'
import Logo from './logo'
import { Button } from './ui/button'

function NavBar() {
  return (
    <div className='fixed z-50 w-full px-10 py-4 items-center justify-between flex'>
        <div className="">
            <div className="flex items-center justify-center gap-2">
                <Logo size='sm'/>
                <h1 className='text-xl font-semibold'>Snipr</h1>
            </div>
        </div>
            <div className="">
                <Button>
                    Signin
                </Button>
            </div>
    </div>
  )
}

export default NavBar