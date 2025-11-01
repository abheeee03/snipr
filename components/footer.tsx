import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

function FooterComponent() {
  return (
    <div className="flex w-full items-center justify-between md:px-20 px-8">
          <h1 className='text-xl font-semibold'> 
             Snipr
          </h1>
          <div className="flex gap-3">
            <span>Support Us On</span>
            <Link href={'https://github.com/abheeee03/snipr'}>
              <FaGithub size={24}/>           
            </Link>
          </div>
        </div>
  )
}

export default FooterComponent