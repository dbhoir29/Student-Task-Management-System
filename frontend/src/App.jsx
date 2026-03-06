import React from 'react'
import { Route, Routes } from "react-router"
import AllTasksPage from "./pages/AllTasksPage"
import CreatePage from "./pages/CreatePage"
import TaskDetailPage from "./pages/TaskDetailPage"
import DashboardPage from "./pages/DashboardPage"

const App = () => {
  return (
    <div data-theme="forest" className="relative min-h-screen w-full">
      <div className='absolute inset-0 -z-10 h-full w-full' />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<AllTasksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
