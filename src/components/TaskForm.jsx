import { useState } from 'react';
import { CalendarDays, Plus, X } from 'lucide-react';
import { CATEGORIES } from '../data.js';

export default function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState(task?.category || 'Personal');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim(), category, dueDate });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading"><div><span className="eyebrow">TASK DETAILS</span><h3>{task ? 'Edit task' : 'Create a task'}</h3></div><button type="button" className="icon-button" aria-label="Close form" onClick={onCancel}><X size={18} /></button></div>
      <label className="field-label" htmlFor="task-title">What needs to get done?</label>
      <input id="task-title" className="text-input" placeholder="e.g. Prepare project presentation" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="100" required autoFocus />
      <label className="field-label" htmlFor="task-description">A little more detail <span className="optional">(optional)</span></label>
      <textarea id="task-description" className="text-input textarea" placeholder="Add notes or details..." value={description} onChange={(e) => setDescription(e.target.value)} rows="2" maxLength="240" />
      <div className="form-row">
        <div className="field-group"><label className="field-label" htmlFor="task-category">Category</label><select id="task-category" className="text-input" value={category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div className="field-group"><label className="field-label" htmlFor="task-date">Due date</label><div className="date-field"><CalendarDays size={16} /><input id="task-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="date-input" /></div></div>
      </div>
      <div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} />{task ? 'Save changes' : 'Add task'}</button></div>
    </form>
  );
}