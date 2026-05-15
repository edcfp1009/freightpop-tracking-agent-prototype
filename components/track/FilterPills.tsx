'use client';

import { Filter, Search, List, Calendar } from 'lucide-react';

const PILLS = ['Outbound', 'Inbound', '3rd Party', 'Return Shipments', 'Needs Follow-up'];

interface FilterPillsProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export default function FilterPills({ activeFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-[#E0E0E0] bg-white flex-wrap">
      <div className="flex items-center border border-[#E0E0E0] rounded overflow-hidden h-8">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 text-[13px] outline-none w-40 h-full"
        />
        <button className="bg-[#2196F3] text-white text-[11px] font-semibold uppercase px-3 h-full tracking-wide">
          GO
        </button>
      </div>

      <div className="flex items-center gap-1 text-[#757575]">
        <Filter size={15} />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {PILLS.map((pill) => {
          const isActive = activeFilter === pill;
          const isAgentPill = pill === 'Needs Follow-up';
          return (
            <button
              key={pill}
              onClick={() => onFilterChange(isActive ? null : pill)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium border transition-colors ${
                isActive
                  ? isAgentPill
                    ? 'bg-[#7E57C2] text-white border-[#7E57C2]'
                    : 'bg-[#212121] text-white border-[#212121]'
                  : 'bg-white text-[#212121] border-[#E0E0E0] hover:bg-[#F5F7FA]'
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center border border-[#E0E0E0] rounded overflow-hidden text-[12px] font-semibold uppercase tracking-wide">
          {['INTERNAL', 'EXTERNAL', 'BOTH'].map((opt, i) => (
            <button
              key={opt}
              className={`px-3 py-1.5 transition-colors ${
                opt === 'BOTH'
                  ? 'bg-[#212121] text-white'
                  : 'text-[#757575] hover:bg-[#F5F7FA]'
              } ${i !== 0 ? 'border-l border-[#E0E0E0]' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-[#2196F3] border border-[#2196F3] rounded">
          <List size={15} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[#757575] border border-[#E0E0E0] rounded hover:bg-[#F5F7FA]">
          <Calendar size={15} />
        </button>
      </div>
    </div>
  );
}
