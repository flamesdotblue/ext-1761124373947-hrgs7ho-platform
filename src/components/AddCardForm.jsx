import { useState } from 'react';
import { Plus } from 'lucide-react';

const priorities = ['Low', 'Medium', 'High'];

export default function AddCardForm({ columns, onAdd }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [column, setColumn] = useState(columns[0]?.id || 'to_learn');
  const [tags, setTags] = useState('');

  const reset = () => {
    setTitle('');
    setSubject('');
    setPriority('Medium');
    setDueDate('');
    setNotes('');
    setColumn(columns[0]?.id || 'to_learn');
    setTags('');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      subject: subject.trim() || 'General',
      priority,
      dueDate,
      notes: notes.trim(),
      column,
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    });
    reset();
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What do you want to learn?"
          className="md:col-span-2 rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        />
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Subject (e.g., Math, Biology)"
          className="rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        >
          {priorities.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        />
        <select
          value={column}
          onChange={e => setColumn(e.target.value)}
          className="rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        >
          {columns.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="md:col-span-2 rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        />
        <input
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notes"
          className="md:col-span-3 rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-200"
        />
        <div className="md:col-span-1 flex items-stretch">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 text-white px-4 py-2 hover:bg-sky-700 active:bg-sky-800 transition"
            aria-label="Add card"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
