import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../Components/Navbar.jsx'
import api from '../lib/axios.js'
import TaskCard from '../Components/TaskCard.jsx'
import TaskNotFound from '../Components/TaskNotFound.jsx'
import { AlertTriangleIcon, XIcon, CalendarIcon, ArrowLeftIcon } from 'lucide-react'
import { formatDate } from '../lib/utils.js'
import { Link } from 'react-router'

const AllTasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [showDueWarning, setShowDueWarning] = useState(false)
  const [dueSoonTasks, setDueSoonTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks')
        const allTasks = res.data
        setTasks(allTasks)

        // Calculate due soon / overdue tasks for popup
        const today = new Date()
        const soon = new Date()
        soon.setDate(soon.getDate() + 3)

        const alertTasks = allTasks.filter(t => {
          if (t.status === "Completed") return false
          const due = new Date(t.dueDate)
          return due <= soon
        }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

        if (alertTasks.length > 0) {
          setDueSoonTasks(alertTasks)
          setShowDueWarning(true)
        }
      } catch (error) {
        console.log("Error fetching tasks", error)
        toast.error("Failed to load tasks")
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const filteredTasks = filter === "All"
    ? tasks
    : tasks.filter(t => t.status === filter)

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />

      {/* Due Date Warning Popup Modal */}
      {showDueWarning && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-warning flex items-center gap-2">
                <AlertTriangleIcon className="size-5 text-warning" />
                Due Date Alert
              </h3>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setShowDueWarning(false)}
              >
                <XIcon className="size-4" />
              </button>
            </div>

            <p className="text-sm text-base-content/60 mb-4">
              The following tasks are overdue or due within the next 3 days:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {dueSoonTasks.map(t => {
                const overdue = new Date(t.dueDate) < new Date()
                return (
                  <div
                    key={t._id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 border 
                      ${overdue ? "border-error bg-error/10" : "border-warning bg-warning/10"}`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm text-base-content line-clamp-1">
                        {t.title}
                      </span>
                      <span className="text-xs text-base-content/60">
                        Assigned to: <span className="font-medium">{t.assignedTo}</span>
                        &nbsp;|&nbsp; ID: {t.studentId}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-3 shrink-0">
                      <span className={`badge badge-sm ${overdue ? "badge-error" : "badge-warning"}`}>
                        {overdue ? "OVERDUE" : "DUE SOON"}
                      </span>
                      <span className="text-xs text-base-content/50 flex items-center gap-1">
                        <CalendarIcon className="size-3" />
                        {formatDate(t.dueDate)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="modal-action mt-4">
              <button className="btn btn-warning btn-sm" onClick={() => setShowDueWarning(false)}>
                Got it
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowDueWarning(false)}>close</button>
          </form>
        </dialog>
      )}

      <div className='max-w-7xl mx-auto p-4 mt-6'>

        {/* Back to Home Button */}
        <Link to="/" className='btn btn-ghost btn-sm mb-5 gap-1'>
          <ArrowLeftIcon className='size-4' /> Back to Home
        </Link>

        {/* Page Title */}
        <h2 className='text-2xl font-bold text-base-content mb-4'>All Tasks</h2>

        {/* Filter Tabs */}
        <div className='flex gap-2 mb-6 flex-wrap'>
          {["All", "Pending", "In Progress", "Completed"].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-ghost"}`}
            >
              {s}
              <span className="badge badge-sm ml-1">
                {s === "All" ? tasks.length : tasks.filter(t => t.status === s).length}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <div className='text-center text-primary py-10 text-lg animate-pulse'>
            Loading tasks...
          </div>
        )}

        {!loading && filteredTasks.length === 0 && <TaskNotFound />}

        {!loading && filteredTasks.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredTasks.map(task => (
              <TaskCard key={task._id} task={task} setTasks={setTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllTasksPage
