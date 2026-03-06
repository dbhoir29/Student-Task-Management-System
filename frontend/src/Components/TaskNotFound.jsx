import React from 'react'
import { ClipboardXIcon } from 'lucide-react'

const TaskNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ClipboardXIcon className="size-16 text-base-content/30 mb-4" />
      <h2 className="text-2xl font-bold text-base-content/50 mb-2">No Tasks Found</h2>
      <p className="text-base-content/40 text-sm">
        You haven't added any tasks yet. Click <strong>New Task</strong> to get started!
      </p>
    </div>
  )
}

export default TaskNotFound
