import { CalendarDays, Check, Pencil, Trash2 } from 'lucide-react';
import { formatDate, isOverdue } from '../data.js';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.completed);
  return (
    <article className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <button className={`check-button ${task.completed ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`}><Check size={15} strokeWidth={3} /></button>
      <div className="task-copy"><div className="task-title-line"><h3>{task.title}</h3><span className={`category-pill category-${task.category.toLowerCase()}`}>{task.category}</span></div>{task.description && <p className="task-description">{task.description}</p>}<div className={`task-date ${overdue ? 'overdue' : ''}`}>{task.dueDate && <><CalendarDays size={14} /><span>{overdue ? 'Overdue · ' : 'Due '}{formatDate(task.dueDate)}</span></>}</div></div>
      <div className="task-actions"><button className="icon-button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={16} /></button><button className="icon-button delete-button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={16} /></button></div>
    </article>
  );
}
