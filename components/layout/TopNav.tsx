'use client';

const NAV_ITEMS = [
  'DASHBOARD', 'Orders', 'Quote/Ship', 'Route Optimization',
  'Pooling', 'Batch Ship', 'Track', 'History', 'Analytics', 'Reports', 'Audit',
];

export default function TopNav() {
  return (
    <header className="h-14 bg-gradient-to-r from-[#1B365D] to-[#22436F] flex items-center px-5 gap-4 shrink-0 shadow-md">
      <span className="text-white font-bold text-[17px] tracking-tight mr-1">FreightPOP</span>

      <button className="bg-[#2196F3] hover:bg-[#1E88E5] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm transition-colors">
        NEW EXPERIENCE
      </button>

      <nav className="flex items-center gap-1 flex-1 overflow-x-auto ml-2">
        {NAV_ITEMS.map((item) => (
          <span
            key={item}
            className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap rounded-md transition-all relative ${
              item === 'Track'
                ? 'text-white bg-white/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {item}
            {item === 'Track' && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#2196F3] rounded-full" />
            )}
          </span>
        ))}
      </nav>

      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5BA4D9] to-[#2196F3] flex items-center justify-center text-white text-[11px] font-bold shrink-0 ring-2 ring-white/10 cursor-pointer hover:ring-white/30 transition-all">
        FP
      </div>
    </header>
  );
}
