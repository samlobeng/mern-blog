import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
const [formData, setFormData] = useState({})
const [errorMessage, setErrorMessage] = useState(null)
const [isLoading, setIsLoading] = useState(false)
const [showAlert, setShowAlert] = useState(true)
const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
    console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!formData.username || !formData.password || !formData.email){
      setShowAlert(true);
      return setErrorMessage("Please fill out all fields")
      
    }
    // send form data to server here
    try {
      setIsLoading(true)
      setErrorMessage(null)
        const res = await fetch('/api/auth/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
        const data = await res.json()
        if(data.success===false){
          setShowAlert(true);
          setIsLoading(false)
          return setErrorMessage(data.message)
        }
        if(res.ok){
          return navigate('/sign-in')
        }
    } catch (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
    }

  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-6xl mx-auto flex-col md:flex-row gap-5'>
        <div className="flex-1">
        <Link to="/sign-up" className='font-bold dark:text-white text-4xl'> 
            <span className='px-2 py-1 bg-teal-500 text-white rounded-lg font-montserrat'>Q.verse</span>
        </Link>
        <p className='mt-5 text-sm leading-8 bg-gray-50 p-5'>
          QrinnyVerse, developed by QrinNext, is a dynamic blog web app designed for both seasoned and new bloggers.
          This platform combines sleek design with robust functionality, enabling easy creation, 
          publication, and sharing of engaging content. With integrated social features and real-time analytics,
          QrinnyVerse offers a vibrant community space to connect, share insights, and grow your digital presence.
        </p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div>
            <Label value='Username'/>
            <TextInput type = "text" placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div>
            <Label value='Email'/>
            <TextInput type = "email" placeholder='name@qrinnyverse.com' id='email' onChange={handleChange} />
            </div>
            <div>
            <Label value='Password'/>
            <TextInput type = "password" placeholder='Password' id='password'onChange={handleChange} />
            </div>
            <Button type = "submit" className='bg-teal-500' disabled={isLoading}>
              {
                isLoading ? (<>
                  <Spinner size = 'sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>): 'Sign Up'
              }
              </Button>
          </form>
          <div className="mt-5">
            Already have an account? &nbsp;<Link to="/sign-in" className='text-blue-500'>Sign in</Link>
          </div>
          {
            errorMessage && showAlert &&(
              <Alert className='mt-5' color='failure' onDismiss = {()=>setShowAlert(false) }>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
