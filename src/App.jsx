import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import AddCardForm from './components/AddCardForm';
import KanbanBoard from './components/KanbanBoard';
import StatsBar from './components/StatsBar';

const COLUMNS = [
  { id: 'to_learn', title: 'To Learn', color: 'bg-sky-500' },
  { id: 'learning', title: 'Learning', color: 'bg-amber-500' },
  { id: 'practicing', title: 'Practicing', color: 'bg-violet-500' },
  { id: 'mastered', title: 'Mastered', color: 'bg-emerald-500' },
];

const defaultCards = [
  {
    id: crypto.randomUUID(),
    title: 'Algebra: Quadratic Equations',
    subject: 'Math',
    priority: 'High',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 10),
    notes: 'Practice factoring and quadratic formula',
    column: 'to_learn',
    tags: ['algebra', 'exam'],
  },
  {
    id: crypto.randomUUID(),
    title: 'Photosynthesis Overview',
    subject: 'Biology',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
    notes: 'Summarize light-dependent reactions',
    column: 'learning',
    tags: ['biology'],
  },
  {
    id: crypto.randomUUID(),
    title: 'Essay: Causes of WW1',
    subject: 'History',
    priority: 'High',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString().slice(0, 10),
    notes: 'Draft thesis and outline',
    column: 'practicing',
    tags: ['essay', 'research'],
  },
  {
    id: crypto.randomUUID(),
    title: 'Python: Functions & Loops',
    subject: 'Computer Science',
    priority: 'Low',
    dueDate: '',
    notes: 'Complete 5 coding challenges',
    column: 'mastered',
    tags: ['python'],
  },
];

export default function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('edu-kanban-cards');
    return saved ? JSON.parse(saved) : defaultCards;
  });
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('All');
  const [subject, setSubject] = useState('All');

  useEffect(() => {
    localStorage.setItem('edu-kanban-cards', JSON.stringify(cards));
  }, [cards]);

  const subjects = useMemo(() => {
    const set = new Set(cards.map(c => c.subject).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [cards]);

  const addCard = (card) => {
    setCards(prev => [{ ...card, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteCard = (id) => setCards(prev => prev.filter(c => c.id !== id));

  const moveCard = (id, toColumn) => {
    setCards(prev => prev.map(c => (c.id === id ? { ...c, column: toColumn } : c)));
  };

  const updateCard = (id, updates) => {
    setCards(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const filteredCards = useMemo(() => {
    return cards.filter(c => {
      const matchesSearch = [c.title, c.subject, c.notes, ...(c.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPriority = priority === 'All' || c.priority === priority;
      const matchesSubject = subject === 'All' || c.subject === subject;
      return matchesSearch && matchesPriority && matchesSubject;
    });
  }, [cards, search, priority, subject]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <StatsBar
          columns={COLUMNS}
          cards={cards}
          search={search}
          onSearch={setSearch}
          priority={priority}
          onPriority={setPriority}
          subject={subject}
          onSubject={setSubject}
          subjects={subjects}
        />

        <AddCardForm columns={COLUMNS} onAdd={addCard} />

        <KanbanBoard
          columns={COLUMNS}
          cards={filteredCards}
          onMove={moveCard}
          onDelete={deleteCard}
          onUpdate={updateCard}
        />
      </div>
    </div>
  );
}
