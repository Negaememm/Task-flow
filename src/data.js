export const CATEGORIES = ['Personal', 'Work', 'Study', 'Urgent'];

export const starterTasks = [
  { id: 'task-1', title: 'Plan the week ahead', description: 'Choose the three things that matter most this week.', category: 'Personal', dueDate: '', completed: false, createdAt: '2026-09-28T08:00:00.000Z' },
  { id: 'task-2', title: 'Review lecture notes', description: 'Revisit the notes from the latest class.', category: 'Study', dueDate: '', completed: false, createdAt: '2026-09-28T07:00:00.000Z' },
  { id: 'task-3', title: 'Send the project update', description: '', category: 'Work', dueDate: '', completed: true, createdAt: '2026-09-27T06:00:00.000Z' },
];

export function formatDate(dateString) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${dateString}T12:00:00`));
}

export function isOverdue(dateString, completed) {
  if (!dateString || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${dateString}T00:00:00`) < today;
}
