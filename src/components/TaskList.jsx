import { Check, ListTodo } from 'lucide-react';
import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, filter, search, onToggle, onEdit, onDelete, onAddTask }) {
  const title = filter === 'active' ? 'In progress' : filter === 'completed' ? 'Completed' : 'All tasks';
  return <section className="task-section"><div className="section-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h2>{title}</h2></div><span className="section-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span></div>
    {tasks.length ? <div className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}</div> : <div className="empty-state"><div className="empty-icon">{filter === 'completed' ? <Check size={24} /> : <ListTodo size={24} />}</div><h3>{search ? 'No matching tasks' : filter === 'active' ? 'You’re all caught up' : filter === 'completed' ? 'Nothing completed yet' : 'A fresh start'}</h3><p>{search ? 'Try a different search or clear the search field.' : filter === 'active' ? 'Enjoy the breathing room, or add another task.' : 'Add a task to get your day moving.'}</p>{filter !== 'completed' && <button className="text-button" onClick={onAddTask}>Create a task <span>→</span></button>}</div>}
  </section>;
}
