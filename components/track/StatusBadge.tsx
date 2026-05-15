import { AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  label: 'ON-TIME' | 'LATE' | 'ISSUE';
}

export default function StatusBadge({ label }: StatusBadgeProps) {
  if (label === 'ON-TIME') {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase bg-[#7CB342] text-white whitespace-nowrap">
        ON-TIME
      </span>
    );
  }
  if (label === 'LATE') {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase bg-[#E53935] text-white whitespace-nowrap">
        LATE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase bg-[#E53935] text-white whitespace-nowrap">
      <AlertCircle size={10} />
      ISSUE
    </span>
  );
}
