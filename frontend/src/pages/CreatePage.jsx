import React, { useState } from 'react'
import api from '../lib/axios.js'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import Navbar from '../Components/Navbar.jsx'

const CreatePage = () => {
  const [form, setForm] = useState({
    studentId: '',
    title: '',
    description: '',
    category: 'Assignment',
    priority: 'Medium',
    status: 'Pending',
    email: '',
    dueDate: '',
    assignedTo: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/tasks', form)
      toast.success('Task created successfully!')
      navigate('/')
    } catch (error) {
      console.log('Error creating task', error)
      toast.error(error.response?.data?.message || 'Failed to create task.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <Link to={'/'} className='btn btn-ghost mb-6 gap-1'>
            <ArrowLeftIcon className='size-5' /> Back to Home
          </Link>

          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Task</h2>

              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Student ID (Mobile Number)</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    placeholder='Enter mobile number'
                    className='input input-bordered'
                    value={form.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder='Task title'
                    className='input input-bordered'
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder='Task description'
                    className='textarea textarea-bordered h-24'
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Category</span>
                    </label>
                    <select
                      name="category"
                      className='select select-bordered'
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      <option>Assignment</option>
                      <option>Project</option>
                      <option>Exam</option>
                      <option>Lab</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Priority</span>
                    </label>
                    <select
                      name="priority"
                      className='select select-bordered'
                      value={form.priority}
                      onChange={handleChange}
                      required
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Status</span>
                  </label>
                  <select
                    name="status"
                    className='select select-bordered'
                    value={form.status}
                    onChange={handleChange}
                    required
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder='student@email.com'
                    className='input input-bordered'
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Due Date</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    className='input input-bordered'
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-control mb-6'>
                  <label className='label'>
                    <span className='label-text'>Assigned To</span>
                  </label>
                  <input
                    type="text"
                    name="assignedTo"
                    placeholder='Assigned person name'
                    className='input input-bordered'
                    value={form.assignedTo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
