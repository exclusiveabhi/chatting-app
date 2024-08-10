import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function Signin() {
  return (
    <div className='flex justify-center my-20 items-center'>
      <SignIn></SignIn>
    </div>
  )
}

export default Signin