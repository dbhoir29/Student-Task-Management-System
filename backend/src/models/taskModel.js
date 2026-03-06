import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Assignment", "Project", "Exam", "Lab", "Other"],
        },
        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High"],
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },
        email: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        assignedTo: {
            type: String,
            required: true,
        },
        dateAdded: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
