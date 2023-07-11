import React from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Router />
      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  )
}

export default App
