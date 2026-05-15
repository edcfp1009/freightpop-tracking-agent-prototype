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
    <div className="flex flex-col h-[calc(100vh-56px)] bg-white">
      {/* Agent Banner */}
      <div className="flex items-center justify-between px-6 bg-[#EDE7F6] border-b border-[#D1C4E9] py-2.5 shrink-0">
        <div className="flex items-center gap-2 text-[13px] text-[#212121]">
          <Bot size={16} className="text-[#7E57C2]" />
          <span>
            Tracking Agent is in{' '}
            <strong className="text-[#7E57C2]">Approval Mode</strong> — all outgoing emails require your review.
          </span>
        </div>
        <button className="flex items-center gap-1 text-[#7E57C2] hover:text-[#6a47a8]">
          <ToggleRight size={22} />
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
      <div className="px-6 pb-3 flex items-center gap-3 text-[13px] text-[#757575] shrink-0">
        <span>426 Total Shipments</span>
        <span className="text-[#E0E0E0]">|</span>
        <span>388 With Delays/Issues</span>
        <span className="text-[#E0E0E0]">|</span>
        <span className="text-[#7E57C2] font-bold">{needsActionCount} Need Agent Action</span>
      </div>

      {/* Tabs */}
      <TrackTabs />

      {/* Filter Row */}
      <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <ShipmentTable
          shipments={filteredShipments}
          activeFilter={activeFilter}
          onDraftEmail={handleDraftEmail}
        />
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
