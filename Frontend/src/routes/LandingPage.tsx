import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='h-screen w-full bg-background flex justify-center items-center flex-col gap-4 text-primary'>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Sign-up</Link>
    </div>
  )
}

export default LandingPage