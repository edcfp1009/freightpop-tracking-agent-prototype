import { Sparkles } from 'lucide-react';

interface AgentBadgeProps {
  showIcon?: boolean;
}

export default function AgentBadge({ showIcon = true }: AgentBadgeProps) {
  return (
    <span className="inline-flex items-center gap-0.5 bg-[#EDE7F6] text-[#7E57C2] text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
      {showIcon && <Sparkles size={9} />}
      AGENT
    </span>
  );
}
