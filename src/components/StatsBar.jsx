import { Search } from 'lucide-react';

export default function StatsBar({ columns, cards, search, onSearch, priority, onPriority, subject, onSubject, subjects }) {
  const counts = columns.reduce((acc, col) => {
    acc[col.id] = cards.filter(c => c.column === col.id).length;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {columns.map(col => (
          <div key={col.id} className="rounded-lg border border-slate-200 p-3 flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${col.color}`}></div>
            <div className="text-sm">
              <div className="text-slate-700 font-medium">{col.title}</div>
              <div className="text-slate-500 text-xs">{counts[col.id]} items</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search by title, tag, subject..."
            className="w-full pl-9 rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
          />
        </div>
        <select
          value={priority}
          onChange={e => onPriority(e.target.value)}
          className="rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        >
          {['All', 'Low', 'Medium', 'High'].map(p => (
            <option key={p} value={p}>{p} Priority</option>
          ))}
        </select>
        <select
          value={subject}
          onChange={e => onSubject(e.target.value)}
          className="rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        >
          {subjects.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
