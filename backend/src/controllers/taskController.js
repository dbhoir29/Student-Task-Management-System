import Task from "../models/taskModel.js";

export async function getAllTasks(_, res) {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in getAllTasks controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        console.error("Error in getTaskById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTask(req, res) {
    try {
        const { studentId, title, description, category, priority, status, email, dueDate, assignedTo } = req.body;

        if (!studentId || !title || !description || !category || !priority || !email || !dueDate || !assignedTo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = new Task({
            studentId,
            title,
            description,
            category,
            priority,
            status: status || "Pending",
            email,
            dueDate,
            assignedTo,
            dateAdded: new Date(),
        });

        const savedTask = await task.save();
        res.status(201).json({ savedTask });
    } catch (error) {
        console.error("Error in createTask controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateTask(req, res) {
    try {
        const { studentId, title, description, category, priority, status, email, dueDate, assignedTo } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { studentId, title, description, category, priority, status, email, dueDate, assignedTo },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error in updateTask controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteTask(req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTask controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getDashboardSummary(_, res) {
    try {
        const total = await Task.countDocuments();
        const pending = await Task.countDocuments({ status: "Pending" });
        const inProgress = await Task.countDocuments({ status: "In Progress" });
        const completed = await Task.countDocuments({ status: "Completed" });
        const highPriority = await Task.countDocuments({ priority: "High" });

        const today = new Date();
        const overdue = await Task.countDocuments({
            dueDate: { $lt: today },
            status: { $ne: "Completed" },
        });

        res.status(200).json({ total, pending, inProgress, completed, highPriority, overdue });
    } catch (error) {
        console.error("Error in getDashboardSummary controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPriorityDueList(_, res) {
    try {
        const today = new Date();
        // Next 5 days window for "due soon"
        const soon = new Date();
        soon.setDate(soon.getDate() + 5);

        // Fetch all non-completed tasks due within next 5 days OR already overdue
        const tasks = await Task.find({
            status: { $ne: "Completed" },
            dueDate: { $lte: soon },
        }).sort({ dueDate: 1 });

        // Group by priority: High → Medium → Low
        const grouped = { High: [], Medium: [], Low: [] };
        tasks.forEach((t) => {
            const isOverdue = new Date(t.dueDate) < today;
            grouped[t.priority]?.push({
                _id: t._id,
                studentId: t.studentId,
                assignedTo: t.assignedTo,
                title: t.title,
                dueDate: t.dueDate,
                status: t.status,
                priority: t.priority,
                isOverdue,
            });
        });

        res.status(200).json(grouped);
    } catch (error) {
        console.error("Error in getPriorityDueList controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
