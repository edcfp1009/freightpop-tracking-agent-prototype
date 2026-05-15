'use client';

import { Truck, FileText, Calendar, Pencil, Trash2, Sparkles } from 'lucide-react';
import { Shipment } from '@/lib/types';
import StatusBadge from './StatusBadge';
import AgentBadge from './AgentBadge';

interface ShipmentTableProps {
  shipments: Shipment[];
  activeFilter: string | null;
  onDraftEmail: (shipment: Shipment) => void;
}

function fmtDate(iso: string) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

export default function ShipmentTable({ shipments, activeFilter, onDraftEmail }: ShipmentTableProps) {
  const showAgentColumn = activeFilter === 'Needs Follow-up';

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full border-collapse text-[13px]" style={{ minWidth: '1200px' }}>
        <thead>
          <tr className="bg-[#FAFBFC] border-b border-[#E0E0E0] sticky top-0 z-10">
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-4 py-3 text-left w-8">
              <input type="checkbox" className="cursor-pointer accent-[#2196F3]" />
            </th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left w-8"></th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left w-16"></th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">On-Time</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Comment</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Status</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Process</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Tracking #</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Connection</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Carrier</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Service</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Orig. ETA</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Upd. ETA</th>
            <th className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-3 py-3 text-left">Actions</th>
            {showAgentColumn && (
              <th className="text-[11px] font-bold uppercase tracking-wider text-[#7E57C2] px-3 py-3 text-left whitespace-nowrap bg-[#F3E5F5]/40">
                Agent Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F0]">
          {shipments.map((s) => {
            const isNeedsAction = s.agent_state === 'needs_action' && showAgentColumn;
            return (
            <tr
              key={s.id}
              className={`hover:bg-[#F8FAFC] transition-colors h-14 ${
                isNeedsAction ? 'bg-[#FBF8FE]' : ''
              }`}
            >
              <td className="px-4 py-3">
                <input type="checkbox" className="cursor-pointer accent-[#2196F3]" />
              </td>
              <td className="px-3 py-3">
                <button className="text-[#9E9E9E] hover:text-[#212121] transition-colors">
                  <FileText size={14} />
                </button>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-1 text-[#9E9E9E]">
                  <Truck size={13} />
                  <Calendar size={13} />
                </div>
              </td>
              <td className="px-3 py-3 whitespace-nowrap">
                <StatusBadge label={s.tracking_status_label} />
              </td>
              <td className="px-3 py-3 max-w-[180px]">
                <span className="truncate block text-[#616161] text-[12px]">
                  {s.tracking_comment || <span className="text-[#BDBDBD]">—</span>}
                </span>
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-[#424242] text-[12px]">{s.current_status}</td>
              <td className="px-3 py-3 whitespace-nowrap text-[#757575] text-[12px] tabular-nums">{fmtDate(s.process_date)}</td>
              <td className="px-3 py-3 whitespace-nowrap">
                <span className="text-[#1976D2] cursor-pointer hover:underline underline-offset-2 font-semibold tabular-nums">
                  {s.tracking_number}
                </span>
              </td>
              <td className="px-3 py-3 max-w-[140px]">
                <span className="truncate block text-[11px] text-[#9E9E9E]">
                  {s.carrier_connection}
                </span>
              </td>
              <td className="px-3 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#212121] font-semibold">{s.carrier_name}</span>
                  {showAgentColumn && s.agent_state === 'needs_action' && <AgentBadge showIcon={false} />}
                </div>
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-[#757575] text-[12px]">{s.carrier_service}</td>
              <td className="px-3 py-3 whitespace-nowrap text-[#757575] text-[12px] tabular-nums">{fmtDate(s.original_eta)}</td>
              <td className="px-3 py-3 whitespace-nowrap">
                <span
                  className={
                    s.updated_eta && s.updated_eta !== s.original_eta
                      ? 'text-[#2E7D32] font-semibold text-[12px] tabular-nums'
                      : 'text-[#757575] text-[12px] tabular-nums'
                  }
                >
                  {fmtDate(s.updated_eta)}
                </span>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-0.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F0F0F0] text-[#9E9E9E] hover:text-[#212121] transition-colors">
                    <Truck size={13} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F0F0F0] text-[#9E9E9E] hover:text-[#212121] transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#FFEBEE] text-[#9E9E9E] hover:text-[#E53935] transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
              {showAgentColumn && (
                <td className="px-3 py-3 whitespace-nowrap bg-[#FBF8FE]/40">
                  {s.agent_state === 'needs_action' ? (
                    <button
                      onClick={() => onDraftEmail(s)}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-b from-[#7E57C2] to-[#673AB7] text-white text-[12px] font-semibold px-3.5 py-2 rounded-md hover:from-[#6a47a8] hover:to-[#5e35b1] transition-all shadow-sm hover:shadow"
                    >
                      <Sparkles size={12} />
                      Draft Email
                    </button>
                  ) : s.agent_state === 'awaiting_reply' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-[#FFF8E1] text-[#F57F17] ring-1 ring-inset ring-[#FFE082]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBC02D] animate-pulse" />
                      Awaiting Reply
                    </span>
                  ) : s.agent_state === 'reply_received' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-[#E3F2FD] text-[#1565C0] ring-1 ring-inset ring-[#90CAF9]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1976D2]" />
                      Reply Received
                    </span>
                  ) : (
                    <span className="text-[12px] text-[#9E9E9E]">—</span>
                  )}
                </td>
              )}
            </tr>
            );
          })}
        </tbody>
      </table>

      {shipments.length === 0 && (
        <div className="text-center py-16 text-[#757575] text-[14px]">
          No shipments match this filter.
        </div>
      )}
    </div>
  );
}
