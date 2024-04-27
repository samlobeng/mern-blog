import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-6xl mx-auto flex-col md:flex-row gap-5'>
        <div className="flex-1">
        <Link to="/sign-up" className='font-bold dark:text-white text-4xl'> 
            <span className='px-2 py-1 bg-teal-500 text-white rounded-lg font-montserrat'>QrinnyVerse</span>
        </Link>
        <p className='mt-5 text-sm leading-8 bg-gray-50 p-5'>
          QrinnyVerse, developed by QrinNext, is a dynamic blog web app designed for both seasoned and new bloggers.
          This platform combines sleek design with robust functionality, enabling easy creation, 
          publication, and sharing of engaging content. With integrated social features and real-time analytics,
          QrinnyVerse offers a vibrant community space to connect, share insights, and grow your digital presence.
        </p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-5'>
            <div>
            <Label value='Your Username'/>
            <TextInput type = "text" placeholder='Username' id='username' />
            </div>
            <div>
            <Label value='Your Email'/>
            <TextInput type = "text" placeholder='name@qrinnyverse.com' id='email' />
            </div>
            <div>
            <Label value='Your Password'/>
            <TextInput type = "password" placeholder='Password' id='password' />
            </div>
            <Button type = "submit" className='bg-teal-500'>Sign Up</Button>
          </form>
          <div className="mt-5">
            Already have an account? &nbsp;<Link to="/sign-in" className='text-blue-500'>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
