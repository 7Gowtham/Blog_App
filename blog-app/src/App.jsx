import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppRouter from './utils/AppRouter'

function App() {
  const router = createBrowserRouter(AppRouter)
  return <>
    <RouterProvider router = {router} />
  </>
}

export default App