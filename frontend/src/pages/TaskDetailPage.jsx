import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import { LoaderIcon, Trash2Icon, ArrowLeftIcon, ListChecksIcon } from 'lucide-react'
import Navbar from '../Components/Navbar.jsx'

const TaskDetailPage = () => {
    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await api.get(`/tasks/${id}`)
                setTask(res.data)
            } catch (error) {
                console.error("Error fetching task", error)
                toast.error("Failed to fetch the task")
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this task?")) return
        try {
            await api.delete(`/tasks/${id}`)
            toast.success("Task deleted successfully")
            navigate("/")
        } catch (error) {
            console.error("Error deleting task", error)
            toast.error("Failed to delete task")
        }
    }

    const handleSave = async () => {
        if (!task.title.trim() || !task.description.trim()) {
            toast.error("Title and description are required")
            return
        }
        setSaving(true)
        try {
            await api.put(`/tasks/${id}`, task)
            toast.success("Task updated successfully")
            navigate("/")
        } catch (error) {
            console.error("Error updating task", error)
            toast.error("Failed to update task")
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10 text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">

                    {/* Back Buttons Row */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Link to="/" className="btn btn-ghost btn-sm gap-1">
                                <ArrowLeftIcon className="h-4 w-4" /> Back to Home
                            </Link>
                            <Link to="/tasks" className="btn btn-ghost btn-sm gap-1">
                                <ListChecksIcon className="h-4 w-4" /> All Tasks
                            </Link>
                        </div>
                        <button onClick={handleDelete} className="btn btn-error btn-outline btn-sm">
                            <Trash2Icon className="h-4 w-4" /> Delete Task
                        </button>
                    </div>

                    {/* Form Card */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Edit Task</h2>

                            {/* Student ID */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Student ID (Mobile Number)</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentId"
                                    className="input input-bordered"
                                    value={task.studentId}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Title */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="input input-bordered"
                                    value={task.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Description */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    className="textarea textarea-bordered h-24"
                                    value={task.description}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Category & Priority */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select
                                        name="category"
                                        className="select select-bordered"
                                        value={task.category}
                                        onChange={handleChange}
                                    >
                                        <option>Assignment</option>
                                        <option>Project</option>
                                        <option>Exam</option>
                                        <option>Lab</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Priority</span>
                                    </label>
                                    <select
                                        name="priority"
                                        className="select select-bordered"
                                        value={task.priority}
                                        onChange={handleChange}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <select
                                    name="status"
                                    className="select select-bordered"
                                    value={task.status}
                                    onChange={handleChange}
                                >
                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered"
                                    value={task.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Due Date */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Due Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    className="input input-bordered"
                                    value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Assigned To */}
                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text">Assigned To</span>
                                </label>
                                <input
                                    type="text"
                                    name="assignedTo"
                                    className="input input-bordered"
                                    value={task.assignedTo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailPage
