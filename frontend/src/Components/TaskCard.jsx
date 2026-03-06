import React, { useState } from 'react'
import { Link, useLocation } from "react-router"
import { Edit2, Trash2, CalendarIcon, UserIcon, TagIcon, AlertTriangleIcon } from "lucide-react"
import { formatDate, isDueSoon, isOverdue, getPriorityColor, getStatusColor } from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast"

const TaskCard = ({ task, setTasks }) => {
    const [showModal, setShowModal] = useState(false)
    const location = useLocation()
    const isActive = location.pathname === `/task/${task._id}`

    const overdue = isOverdue(task.dueDate) && task.status !== "Completed"
    const dueSoon = isDueSoon(task.dueDate) && task.status !== "Completed"

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${task._id}`)
            setTasks((prev) => prev.filter((t) => t._id !== task._id))
            toast.success("Task deleted successfully")
        } catch {
            toast.error("Failed to delete task")
        } finally {
            setShowModal(false)
        }
    }

    return (
        <>
            <Link
                to={`/task/${task._id}`}
                className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 
                    ${isActive ? "border-primary shadow-lg" : "border-base-300"} 
                    hover:border-primary hover:shadow-xl
                    ${overdue ? "border-l-4 border-l-error" : ""}
                    ${dueSoon && !overdue ? "border-l-4 border-l-warning" : ""}`}
            >
                {/* Due Date Warning Banner */}
                {overdue && (
                    <div className="flex items-center gap-1 text-error text-xs mb-2 font-semibold">
                        <AlertTriangleIcon className="size-3" /> OVERDUE
                    </div>
                )}
                {dueSoon && !overdue && (
                    <div className="flex items-center gap-1 text-warning text-xs mb-2 font-semibold">
                        <AlertTriangleIcon className="size-3" /> DUE SOON
                    </div>
                )}

                {/* Top Row */}
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-base-content/50 truncate max-w-[60%]">
                        ID: {task.studentId}
                    </span>
                    <span className={`badge badge-sm ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-base-content text-base line-clamp-1 mb-1">
                    {task.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-base-content/60 line-clamp-2 mb-3">
                    {task.description}
                </p>

                {/* Info Row */}
                <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-xs text-base-content/70">
                        <TagIcon className="size-3 text-primary" />
                        <span>{task.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-base-content/70">
                        <UserIcon className="size-3 text-primary" />
                        <span className="truncate">{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-base-content/70">
                        <CalendarIcon className="size-3 text-primary" />
                        <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-2">
                    <span className={`badge badge-sm ${getStatusColor(task.status)}`}>
                        {task.status}
                    </span>

                    <div className="flex items-center gap-4">
                        <div className="tooltip tooltip-warning" data-tip="Edit task">
                            <Edit2 className="size-4 text-warning hover:scale-110 transition" />
                        </div>
                        <div className="tooltip tooltip-error" data-tip="Delete task">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowModal(true)
                                }}
                                className="text-error hover:scale-110 transition"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>

            {/* DELETE CONFIRMATION MODAL */}
            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-error flex items-center gap-2">
                            <Trash2 className="size-5" /> Delete Task
                        </h3>
                        <p className="py-4 text-base-content/70">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-base-content">"{task.title}"</span>?
                            <br /> This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}>
                                <Trash2 className="size-4" /> Delete
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    )
}

export default TaskCard
