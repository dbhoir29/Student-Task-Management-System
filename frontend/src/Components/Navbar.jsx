import React from 'react'
import { Link, useLocation } from 'react-router'
import { PlusIcon, ListChecksIcon, BookOpenCheckIcon } from "lucide-react"

const Navbar = () => {
  const location = useLocation()

  return (
    <header className='bg-base-100 border-b border-base-content/10 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo → Home (Dashboard) */}
          <Link to="/" className='flex items-center gap-2'>
            <BookOpenCheckIcon className='size-7 text-primary' />
            <h1 className='text-2xl font-bold text-primary font-mono tracking-tight'>
              TaskManager
            </h1>
          </Link>

          <div className='flex items-center gap-3'>
            {/* All Tasks Button */}
            <Link
              to="/tasks"
              className={`btn btn-sm gap-1 ${location.pathname === '/tasks' ? 'btn-secondary' : 'btn-ghost'}`}
            >
              <ListChecksIcon className='size-4' />
              <span className='hidden sm:block'>All Tasks</span>
            </Link>

            {/* New Task Button */}
            <Link to="/create" className="btn btn-primary btn-sm gap-1">
              <PlusIcon className='size-4' />
              <span>New Task</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
