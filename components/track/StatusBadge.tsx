import { AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  label: 'ON-TIME' | 'LATE' | 'ISSUE';
}

export default function StatusBadge({ label }: StatusBadgeProps) {
  if (label === 'ON-TIME') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide bg-[#E8F5E9] text-[#2E7D32] whitespace-nowrap ring-1 ring-inset ring-[#A5D6A7]/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#43A047]" />
        ON-TIME
      </span>
    );
  }
  if (label === 'LATE') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide bg-[#FFEBEE] text-[#C62828] whitespace-nowrap ring-1 ring-inset ring-[#EF9A9A]/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
        LATE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide bg-[#FFF3E0] text-[#E65100] whitespace-nowrap ring-1 ring-inset ring-[#FFCC80]/50">
      <AlertCircle size={10} />
      ISSUE
    </span>
  );
}
