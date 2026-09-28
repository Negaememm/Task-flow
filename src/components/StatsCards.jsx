import { Check, Clock3, ListTodo } from 'lucide-react';

export default function StatsCards({ counts }) {
  const cards = [
    { label: 'Total tasks', value: counts.total, icon: ListTodo, tone: 'lavender', detail: 'Across all categories' },
    { label: 'In progress', value: counts.remaining, icon: Clock3, tone: 'peach', detail: counts.remaining ? 'Keep the momentum going' : 'You’re all caught up' },
    { label: 'Completed', value: counts.completed, icon: Check, tone: 'mint', detail: counts.total ? `${Math.round((counts.completed / counts.total) * 100)}% of your tasks` : 'Ready when you are' },
  ];
  return <section className="stats-grid" aria-label="Task summary">{cards.map(({ label, value, icon: Icon, tone, detail }) => <article className="stat-card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className="stat-detail">{detail}</span></article>)}</section>;
}
