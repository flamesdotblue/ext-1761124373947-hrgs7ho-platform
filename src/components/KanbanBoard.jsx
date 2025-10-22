import { Calendar, Tag, Trash2 } from 'lucide-react';

function PriorityBadge({ priority }) {
  const map = {
    Low: 'bg-emerald-100 text-emerald-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-rose-100 text-rose-700',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${map[priority] || 'bg-slate-100 text-slate-700'}`}>
      {priority}
    </span>
  );
}

function Card({ card, onDelete, onUpdate, onDragStart }) {
  const overdue = card.dueDate && new Date(card.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className="group border border-slate-200 bg-white rounded-lg p-3 shadow-sm hover:shadow transition cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{card.title}</h4>
          <p className="text-xs text-slate-500">{card.subject}</p>
        </div>
        <PriorityBadge priority={card.priority} />
      </div>

      {card.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {card.tags.map((t, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              <Tag className="h-3 w-3" />
              {t}
            </span>
          ))}
        </div>
      )}

      {card.notes && (
        <p className="mt-2 text-xs text-slate-600 line-clamp-3">{card.notes}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {card.dueDate && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${overdue ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-50'}`}>
              <Calendar className="h-3.5 w-3.5" /> {card.dueDate}
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(card.id)}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded transition"
          aria-label="Delete card"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function KanbanBoard({ columns, cards, onMove, onDelete, onUpdate }) {
  const grouped = columns.reduce((acc, col) => {
    acc[col.id] = cards.filter(c => c.column === col.id);
    return acc;
  }, {});

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) onMove(id, colId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map(col => (
        <div key={col.id} className="flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${col.color}`}></div>
              <h3 className="text-sm font-semibold text-slate-700">{col.title}</h3>
            </div>
            <span className="text-xs text-slate-400">{grouped[col.id]?.length || 0}</span>
          </div>

          <div
            onDrop={(e) => handleDrop(e, col.id)}
            onDragOver={handleDragOver}
            className="flex-1 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-2 space-y-2"
          >
            {(grouped[col.id] || []).map(card => (
              <Card
                key={card.id}
                card={card}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onDragStart={handleDragStart}
              />
            ))}
            {(!grouped[col.id] || grouped[col.id].length === 0) && (
              <div className="text-xs text-slate-400 text-center py-6">Drag cards here</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
