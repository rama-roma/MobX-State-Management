import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Home from './pages/home'
import Sync from './pages/sync'
import Async from './pages/async'
import InfoSync from './pages/infoSync'
import InfoAsync from './pages/infoAsync'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/sync' element={<Sync/>} />
                <Route path='/async' element={<Async/>} />
                <Route path='/infoSync/:id' element={<InfoSync/>} />
                <Route path='/infoAsync/:id' element={<InfoAsync/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App