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
          <tr className="bg-white border-b border-[#E0E0E0] sticky top-0 z-10">
            <th className="text-[12px] font-semibold text-[#212121] px-4 py-2 text-left w-8">
              <input type="checkbox" className="cursor-pointer" />
            </th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left w-8"></th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left w-16">Status</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">On-Time</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Comment</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Curr. Status</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Process Date</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Tracking #</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Connection</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Carrier</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Service</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Orig. ETA</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Upd. ETA</th>
            <th className="text-[12px] font-semibold text-[#212121] px-3 py-2 text-left">Actions</th>
            {showAgentColumn && (
              <th className="text-[12px] font-semibold text-[#7E57C2] px-3 py-2 text-left whitespace-nowrap">
                Agent Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr
              key={s.id}
              className="border-b border-[#E0E0E0] hover:bg-[#F5F7FA] transition-colors h-12"
            >
              <td className="px-4 py-2">
                <input type="checkbox" className="cursor-pointer" />
              </td>
              <td className="px-3 py-2">
                <button className="text-[#757575] hover:text-[#212121]">
                  <FileText size={14} />
                </button>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-1 text-[#757575]">
                  <Truck size={13} />
                  <Calendar size={13} />
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <StatusBadge label={s.tracking_status_label} />
              </td>
              <td className="px-3 py-2 max-w-[150px]">
                <span className="truncate block text-[#757575] text-[12px]">
                  {s.tracking_comment || '—'}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-[#212121]">{s.current_status}</td>
              <td className="px-3 py-2 whitespace-nowrap text-[#757575]">{fmtDate(s.process_date)}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className="text-[#1976D2] cursor-pointer underline underline-offset-2">
                  {s.tracking_number}
                </span>
              </td>
              <td className="px-3 py-2 max-w-[130px]">
                <span className="truncate block text-[12px] text-[#757575]">
                  {s.carrier_connection}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span className="text-[#212121]">{s.carrier_name}</span>
                  {showAgentColumn && s.agent_state === 'needs_action' && <AgentBadge showIcon={false} />}
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-[#757575]">{s.carrier_service}</td>
              <td className="px-3 py-2 whitespace-nowrap text-[#757575]">{fmtDate(s.original_eta)}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={
                    s.updated_eta && s.updated_eta !== s.original_eta
                      ? 'text-[#4CAF50] font-medium'
                      : 'text-[#757575]'
                  }
                >
                  {fmtDate(s.updated_eta)}
                </span>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#E0E0E0] text-[#757575]">
                    <Truck size={13} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#E0E0E0] text-[#757575]">
                    <Pencil size={13} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#E0E0E0] text-[#E53935]">
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
              {showAgentColumn && (
                <td className="px-3 py-2 whitespace-nowrap">
                  {s.agent_state === 'needs_action' ? (
                    <button
                      onClick={() => onDraftEmail(s)}
                      className="inline-flex items-center gap-1.5 bg-[#7E57C2] text-white text-[12px] font-semibold px-3 py-1.5 rounded hover:bg-[#6a47a8] transition-colors"
                    >
                      <Sparkles size={12} />
                      Draft Email
                    </button>
                  ) : (
                    <span className="text-[12px] text-[#757575] capitalize">{s.agent_state.replace('_', ' ')}</span>
                  )}
                </td>
              )}
            </tr>
          ))}
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
