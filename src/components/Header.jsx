import { Book } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white">
            <Book className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Edu Kanban</h1>
            <p className="text-xs text-slate-500">Plan, learn, practice, and master</p>
          </div>
        </div>
        <a
          className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-4"
          href="#"
        >
          Tips: Drag cards between stages
        </a>
      </div>
    </header>
  );
}
