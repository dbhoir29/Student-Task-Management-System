export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function isDueSoon(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
}

export function isOverdue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
}

export function getPriorityColor(priority) {
    switch (priority) {
        case "High": return "badge-error";
        case "Medium": return "badge-warning";
        case "Low": return "badge-success";
        default: return "badge-ghost";
    }
}

export function getStatusColor(status) {
    switch (status) {
        case "Completed": return "badge-success";
        case "In Progress": return "badge-info";
        case "Pending": return "badge-warning";
        default: return "badge-ghost";
    }
}
