import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import StatsCards from './components/StatsCards.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { starterTasks } from './data.js';

const TASKS_KEY = 'taskflow.tasks.v1';
const THEME_KEY = 'taskflow.theme.v1';

function readSavedTasks() {
  try {
    const saved = localStorage.getItem(TASKS_KEY);
    if (!saved) return starterTasks;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : starterTasks;
  } catch {
    return starterTasks;
  }
}

function readSavedTheme() {
  try { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; }
  catch { return 'light'; }
}

export default function App() {
  const [tasks, setTasks] = useState(readSavedTasks);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(readSavedTheme);
  const [editingTask, setEditingTask] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  useEffect(() => {
    const focusSearch = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    return { total: tasks.length, completed, remaining: tasks.length - completed };
  }, [tasks]);

  const visibleTasks = useMemo(() => tasks
    .filter((task) => filter === 'all' || (filter === 'active' ? !task.completed : task.completed))
    .filter((task) => `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => Number(a.completed) - Number(b.completed) || (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31') || b.createdAt.localeCompare(a.createdAt)), [tasks, filter, search]);

  const openNewTask = () => { setEditingTask(null); setFormOpen(true); setMenuOpen(false); };
  const closeForm = () => { setEditingTask(null); setFormOpen(false); };
  const saveTask = (details) => {
    if (editingTask) setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...task, ...details } : task));
    else setTasks((current) => [{ ...details, id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString() }, ...current]);
    closeForm();
  };
  const toggleTask = (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id));
  const editTask = (task) => { setEditingTask(task); setFormOpen(true); };
  const chooseFilter = (nextFilter) => { setFilter(nextFilter); setMenuOpen(false); };

  return <div className="app-shell" id="top">
    <Sidebar activeFilter={filter} onFilterChange={chooseFilter} counts={counts} onAddTask={openNewTask} />
    {menuOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
    <div className={`mobile-sidebar ${menuOpen ? 'open' : ''}`}><Sidebar activeFilter={filter} onFilterChange={chooseFilter} counts={counts} onAddTask={openNewTask} /></div>
    <main className="main-content">
      <header className="topbar"><div className="topbar-left"><button className="icon-button menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={20} /></button><div className="breadcrumb">Workspace <span>/</span> <strong>My tasks</strong></div></div><div className="topbar-right"><span className="today-label">A good day to make progress</span><button className="icon-button theme-button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><span className="user-avatar">Y</span></div></header>
      <div className="content-wrap"><section className="welcome-row"><div><span className="eyebrow welcome-eyebrow">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</span><h1>Good morning<span className="wave">✦</span></h1><p>Here’s a little overview of your day.</p></div><button className="primary-button header-add" onClick={openNewTask}><span>＋</span> Add a task</button></section>
        <StatsCards counts={counts} />
        <div className="toolbar"><div className="toolbar-title"><span className="toolbar-dot" /><span>Your focus</span></div><label className="search-box"><Search size={16} /><input ref={searchInputRef} aria-label="Search tasks" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." /><kbd>⌘ K</kbd></label></div>
        {formOpen && <TaskForm key={editingTask?.id || 'new'} task={editingTask} onSave={saveTask} onCancel={closeForm} />}
        <TaskList tasks={visibleTasks} filter={filter} search={search} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} onAddTask={openNewTask} />
        <footer className="page-footer"><span>Small steps, meaningful progress.</span><span>TaskFlow · Your day, in flow</span></footer>
      </div>
    </main>
  </div>;
}
