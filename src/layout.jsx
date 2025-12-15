import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
     <main>
        <header className='max-w-[1400px] m-auto p-4'>
            <nav className='flex items-center justify-center gap-[20px]'>
                <Link to='/home'>
                  <button>Home</button>
                </Link>
                <Link to='/sync'>
                  <button>Sync</button>
                </Link>
                <Link to='/async'>
                  <button>Async</button>
                </Link>
            </nav>
        </header>
        <main className='max-w-[1400px] m-auto p-4'>
            <Outlet/>
        </main>
     </main>
    </>
  )
}

export default Layout