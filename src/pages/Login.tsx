import React from 'react'
import SignInButton from '../components/SignInButton'

const Login = () => {
  return (
    <>
      <h1 className="text-white">LOGIN</h1>
      <div>
        <SignInButton
          classes={
            'block px-4 py-3 my-4 text-sm text-gray-700 dark:text-white hover:cursor-pointer dark:hover:bg-gray-700'
          }
        />
      </div>
    </>
  )
}

export default Login
