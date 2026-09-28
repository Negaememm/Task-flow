import { Check, CircleHelp, LayoutDashboard, ListTodo, Plus, Settings } from 'lucide-react';

export default function Sidebar({ activeFilter, onFilterChange, counts, onAddTask }) {
  const links = [
    { id: 'all', label: 'All tasks', icon: LayoutDashboard, count: counts.total },
    { id: 'active', label: 'In progress', icon: ListTodo, count: counts.remaining },
    { id: 'completed', label: 'Completed', icon: Check, count: counts.completed },
  ];

  return (
    <aside className="sidebar">
      <a className="brand" href="#top" aria-label="TaskFlow home">
        <span className="brand-mark"><Check size={19} strokeWidth={3} /></span>
        <span>task<span className="brand-light">flow</span></span>
      </a>
      <button className="primary-button sidebar-add" onClick={onAddTask}><Plus size={17} /> New task</button>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="nav-list" aria-label="Task filters">
        {links.map(({ id, label, icon: Icon, count }) => (
          <button key={id} className={`nav-item ${activeFilter === id ? 'selected' : ''}`} onClick={() => onFilterChange(id)}>
            <Icon size={18} /><span>{label}</span><span className="nav-count">{count}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-note"><div className="note-icon"><CircleHelp size={17} /></div><strong>Make space for what matters.</strong><p>A little progress each day adds up.</p></div>
        <div className="sidebar-footer"><span className="avatar">Y</span><span><strong>Your workspace</strong><small>Personal plan</small></span><Settings size={17} className="settings-icon" /></div>
      </div>
    </aside>
  );
}
