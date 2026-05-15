'use client';

const NAV_ITEMS = [
  'DASHBOARD', 'Orders', 'Quote/Ship', 'Route Optimization',
  'Pooling', 'Batch Ship', 'Track', 'History', 'Analytics', 'Reports', 'Audit',
];

export default function TopNav() {
  return (
    <header className="h-14 bg-[#1B365D] flex items-center px-4 gap-3 shrink-0">
      <span className="text-white font-bold text-lg tracking-tight mr-2">FreightPOP</span>

      <button className="bg-[#2196F3] text-white text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded mr-1">
        NEW EXPERIENCE
      </button>

      <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto">
        {NAV_ITEMS.map((item) => (
          <span
            key={item}
            className={`px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide cursor-pointer whitespace-nowrap rounded transition-colors ${
              item === 'Track'
                ? 'text-white border-b-2 border-[#2196F3]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {item}
          </span>
        ))}
      </nav>

      <div className="w-8 h-8 rounded-full bg-[#5BA4D9] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
        FP
      </div>
    </header>
  );
}
