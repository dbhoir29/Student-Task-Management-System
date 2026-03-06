import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar.jsx'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import {
    ClipboardListIcon,
    ClockIcon,
    PlayCircleIcon,
    CheckCircleIcon,
    AlertTriangleIcon,
    FlameIcon,
    LoaderIcon,
    CalendarIcon,
    UserIcon,
    ListChecksIcon
} from 'lucide-react'
import { formatDate } from '../lib/utils.js'
import { Link } from 'react-router'

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className='card bg-base-100 shadow-md'>
        <div className='card-body flex-row items-center gap-4 p-5'>
            <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                <Icon className={`size-6 ${color.replace("bg-", "text-")}`} />
            </div>
            <div>
                <p className='text-base-content/60 text-sm'>{label}</p>
                <p className='text-3xl font-bold text-base-content'>{value}</p>
            </div>
        </div>
    </div>
)

const PRIORITY_CONFIG = [
    { key: "High", label: "🔴 High Priority", headerClass: "bg-error/20 text-error border-error/30" },
    { key: "Medium", label: "🟡 Medium Priority", headerClass: "bg-warning/20 text-warning border-warning/30" },
    { key: "Low", label: "🟢 Low Priority", headerClass: "bg-success/20 text-success border-success/30" },
]

const DashboardPage = () => {
    const [summary, setSummary] = useState(null)
    const [priorityList, setPriorityList] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [summaryRes, priorityRes] = await Promise.all([
                    api.get('/tasks/summary'),
                    api.get('/tasks/priority-due-list'),
                ])
                setSummary(summaryRes.data)
                setPriorityList(priorityRes.data)
            } catch (error) {
                console.error("Error fetching dashboard", error)
                toast.error("Failed to load dashboard")
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])

    if (loading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10 text-primary' />
            </div>
        )
    }

    const totalDueSoon = priorityList
        ? Object.values(priorityList).reduce((acc, arr) => acc + arr.length, 0)
        : 0

    return (
        <div className='min-h-screen bg-base-200'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>

                {/* Page Header */}
                <div className='flex items-center justify-between mb-2'>
                    <h2 className='text-3xl font-bold text-base-content'>Dashboard Summary</h2>
                    <Link to="/tasks" className='btn btn-outline btn-sm gap-1'>
                        <ListChecksIcon className='size-4' />
                        View All Tasks
                    </Link>
                </div>
                <p className='text-base-content/50 text-sm mb-8'>Overview of all student tasks</p>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
                    <StatCard icon={ClipboardListIcon} label="Total Tasks" value={summary.total} color="bg-primary" />
                    <StatCard icon={ClockIcon} label="Pending" value={summary.pending} color="bg-warning" />
                    <StatCard icon={PlayCircleIcon} label="In Progress" value={summary.inProgress} color="bg-info" />
                    <StatCard icon={CheckCircleIcon} label="Completed" value={summary.completed} color="bg-success" />
                    <StatCard icon={FlameIcon} label="High Priority" value={summary.highPriority} color="bg-error" />
                    <StatCard icon={AlertTriangleIcon} label="Overdue" value={summary.overdue} color="bg-error" />
                </div>

                {/* Priority-wise Due Soon Student List */}
                <div className='mb-4 flex items-center gap-3'>
                    <h3 className='text-2xl font-bold text-base-content'>
                        ⏰ Due Soon — Priority List
                    </h3>
                    {totalDueSoon > 0 && (
                        <span className='badge badge-warning badge-md font-semibold'>
                            {totalDueSoon} task{totalDueSoon > 1 ? "s" : ""}
                        </span>
                    )}
                </div>
                <p className='text-base-content/50 text-sm mb-6'>
                    Students with tasks overdue or due within the next 5 days (excluding completed)
                </p>

                {totalDueSoon === 0 ? (
                    <div className='card bg-base-100 shadow-md p-8 text-center text-base-content/40'>
                        <CheckCircleIcon className='size-10 mx-auto mb-2 text-success' />
                        <p className='font-semibold'>All tasks are on track!</p>
                        <p className='text-sm mt-1'>No tasks due within the next 5 days.</p>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {PRIORITY_CONFIG.map(({ key, label, headerClass }) => {
                            const students = priorityList[key]
                            if (!students || students.length === 0) return null
                            return (
                                <div key={key} className='card bg-base-100 shadow-md overflow-hidden'>
                                    <div className={`px-5 py-3 border-b font-bold text-sm tracking-wide ${headerClass}`}>
                                        {label} — {students.length} task{students.length > 1 ? "s" : ""}
                                    </div>
                                    <div className='divide-y divide-base-200'>
                                        {students.map((t) => (
                                            <div
                                                key={t._id}
                                                className={`flex items-center justify-between px-5 py-3 hover:bg-base-200 transition
                                                    ${t.isOverdue ? "bg-error/5" : ""}`}
                                            >
                                                <div className='flex flex-col gap-0.5'>
                                                    <div className='flex items-center gap-2'>
                                                        <UserIcon className='size-3.5 text-primary shrink-0' />
                                                        <span className='font-semibold text-sm text-base-content'>
                                                            {t.assignedTo}
                                                        </span>
                                                        <span className='text-xs text-base-content/40'>
                                                            (ID: {t.studentId})
                                                        </span>
                                                    </div>
                                                    <span className='text-xs text-base-content/60 ml-5 line-clamp-1'>
                                                        {t.title}
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-3 ml-4 shrink-0'>
                                                    <div className='flex items-center gap-1 text-xs text-base-content/60'>
                                                        <CalendarIcon className='size-3' />
                                                        {formatDate(t.dueDate)}
                                                    </div>
                                                    <span className={`badge badge-sm font-semibold
                                                        ${t.isOverdue ? "badge-error" : "badge-warning"}`}>
                                                        {t.isOverdue ? "OVERDUE" : "DUE SOON"}
                                                    </span>
                                                    <span className='badge badge-ghost badge-sm'>
                                                        {t.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardPage
