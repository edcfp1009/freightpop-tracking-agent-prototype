'use client';

import { useState } from 'react';
import { Plus, Bot, ToggleRight } from 'lucide-react';
import { Shipment } from '@/lib/types';
import { allShipments } from '@/lib/data/shipments';
import TrackTabs from '@/components/track/TrackTabs';
import FilterPills from '@/components/track/FilterPills';
import ShipmentTable from '@/components/track/ShipmentTable';
import EmailDraftPanel from '@/components/track/EmailDraftPanel';

export default function TrackPage() {
  const [shipments, setShipments] = useState<Shipment[]>(allShipments);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filteredShipments =
    activeFilter === 'Needs Follow-up'
      ? shipments.filter((s) => s.agent_state === 'needs_action')
      : activeFilter
      ? shipments.filter((s) => s.direction === activeFilter || s.direction.toLowerCase() === activeFilter.toLowerCase())
      : shipments;

  const needsActionCount = shipments.filter((s) => s.agent_state === 'needs_action').length;

  function handleDraftEmail(shipment: Shipment) {
    setSelectedShipment(shipment);
    setPanelOpen(true);
  }

  function handleApprove(shipmentId: string) {
    setShipments((prev) =>
      prev.map((s) => (s.id === shipmentId ? { ...s, agent_state: 'awaiting_reply' } : s))
    );
    setPanelOpen(false);
    const approved = shipments.find((s) => s.id === shipmentId);
    if (approved) {
      showToast(`Email sent to ${approved.carrier_contact.email}`);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[#F5F7FA]">
      {/* Agent Banner */}
      <div className="flex items-center justify-between px-6 bg-gradient-to-r from-[#EDE7F6] via-[#F3E5F5] to-[#EDE7F6] border-b border-[#D1C4E9] py-3 shrink-0">
        <div className="flex items-center gap-3 text-[13px] text-[#212121]">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center ring-1 ring-[#D1C4E9]">
            <Bot size={16} className="text-[#7E57C2]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Tracking Agent</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[#7E57C2] text-[11px] font-bold uppercase tracking-wide ring-1 ring-[#D1C4E9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E57C2] animate-pulse" />
              Approval Mode
            </span>
            <span className="text-[#757575]">— all outgoing emails require your review.</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#7E57C2] hover:text-[#6a47a8] px-3 py-1.5 rounded-md hover:bg-white/60 transition-colors">
          <ToggleRight size={18} />
          Auto Mode
        </button>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
        <h1 className="text-[24px] font-semibold text-[#212121]">Track</h1>
        <button className="w-10 h-10 rounded-full bg-[#2196F3] text-white flex items-center justify-center hover:bg-[#1976D2] transition-colors shadow-md text-xl font-light">
          <Plus size={20} />
        </button>
      </div>

      {/* KPI Strip */}
      <div className="px-6 pb-4 flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F7FA] text-[13px]">
          <span className="font-bold text-[#212121]">426</span>
          <span className="text-[#757575]">Total Shipments</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFF3E0] text-[13px]">
          <span className="font-bold text-[#E65100]">388</span>
          <span className="text-[#BF360C]">With Delays/Issues</span>
        </div>
        <button
          onClick={() => setActiveFilter(activeFilter === 'Needs Follow-up' ? null : 'Needs Follow-up')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#EDE7F6] text-[13px] hover:bg-[#D1C4E9] transition-colors cursor-pointer ring-1 ring-[#D1C4E9]"
        >
          <Bot size={13} className="text-[#7E57C2]" />
          <span className="font-bold text-[#7E57C2]">{needsActionCount}</span>
          <span className="text-[#5E35B1] font-medium">Need Agent Action →</span>
        </button>
      </div>

      {/* Tabs */}
      <TrackTabs />

      {/* Filter Row */}
      <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm overflow-hidden">
          <ShipmentTable
            shipments={filteredShipments}
            activeFilter={activeFilter}
            onDraftEmail={handleDraftEmail}
          />
        </div>
      </div>

      {/* Email Draft Panel */}
      <EmailDraftPanel
        shipment={selectedShipment}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onApprove={handleApprove}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#212121] text-white text-[13px] px-5 py-3 rounded-lg shadow-xl z-[100] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
