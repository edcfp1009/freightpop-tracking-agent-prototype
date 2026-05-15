'use client';

import { useState, useEffect } from 'react';
import { X, Send, Sparkles, RefreshCw, Mail, MapPin, Clock } from 'lucide-react';
import { Shipment } from '@/lib/types';
import AgentBadge from './AgentBadge';

interface EmailDraftPanelProps {
  shipment: Shipment | null;
  open: boolean;
  onClose: () => void;
  onApprove: (shipmentId: string) => void;
}

function getFirstName(fullName: string): string {
  const parts = fullName.split(/[\s,—–-]/);
  const word = parts.find((p) => p.length > 2 && !/dispatch|team|dept/i.test(p));
  return word ?? 'Team';
}

function buildEmailBody(s: Shipment): string {
  const firstName = getFirstName(s.carrier_contact.name);
  return `Hi ${firstName},

Checking in on shipment ${s.tracking_number} from ${s.origin} to ${s.destination}.

Original ETA was ${s.original_eta}. Current status in our system is "${s.current_status}" and the last known location is ${s.last_known_location} as of ${s.hours_since_last_update} hours ago.

Could you confirm:
- Current location of the shipment
- Updated ETA to ${s.destination}
- Any exceptions or delays we should know about

Appreciate the update.

Thanks,
FreightPOP Tracking`;
}

function fmtDate(iso: string) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

export default function EmailDraftPanel({ shipment, open, onClose, onApprove }: EmailDraftPanelProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (shipment) {
      setSubject(`Status update request — Pro ${shipment.tracking_number}`);
      setBody(buildEmailBody(shipment));
    }
  }, [shipment]);

  if (!open || !shipment) return null;

  const handleApprove = () => {
    onApprove(shipment.id);
  };

  const handleRegenerate = () => {
    setBody(buildEmailBody(shipment));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#7E57C2]" />
            <span className="text-[16px] font-semibold text-[#212121]">Draft Follow-up Email</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F5F7FA] text-[#757575]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-4">
          {/* Section A: Shipment Context */}
          <div className="bg-[#F5F7FA] rounded-lg p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#757575] mb-3">
              Shipment Context
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[13px]">
              <div>
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">Tracking #</span>
                <span className="font-medium text-[#1976D2]">{shipment.tracking_number}</span>
              </div>
              <div>
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">Carrier</span>
                <span className="font-medium text-[#212121]">{shipment.carrier_name}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">Route</span>
                <span className="font-medium text-[#212121]">{shipment.origin} → {shipment.destination}</span>
              </div>
              <div>
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">Original ETA</span>
                <span className="font-medium text-[#212121]">{fmtDate(shipment.original_eta)}</span>
              </div>
              <div>
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">Updated ETA</span>
                <span
                  className={`font-medium ${
                    shipment.updated_eta !== shipment.original_eta
                      ? 'text-[#4CAF50]'
                      : 'text-[#212121]'
                  }`}
                >
                  {fmtDate(shipment.updated_eta)}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">
                  <MapPin size={10} className="inline mr-0.5" />Last Known Location
                </span>
                <span className="font-medium text-[#212121]">{shipment.last_known_location || '—'}</span>
              </div>
              <div>
                <span className="text-[#757575] text-[11px] uppercase tracking-wide flex items-center gap-0.5">
                  <Clock size={10} />Hours Since Update
                </span>
                <span
                  className={`font-medium ${
                    shipment.hours_since_last_update > 48 ? 'text-[#E53935]' : 'text-[#212121]'
                  }`}
                >
                  {shipment.hours_since_last_update}h
                  {shipment.hours_since_last_update > 48 && ' ⚠️'}
                </span>
              </div>
              <div>
                <span className="text-[#757575] text-[11px] uppercase tracking-wide block">Issue</span>
                <span className="font-medium text-[#212121] text-[12px]">{shipment.issue_reason || '—'}</span>
              </div>
            </div>
          </div>

          {/* Section B: Recipient */}
          <div className="border border-[#E0E0E0] rounded-lg p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#757575] mb-3">
              Recipient
            </p>
            <div className="space-y-1 text-[13px]">
              <div className="font-medium text-[#212121]">{shipment.carrier_contact.name}</div>
              <div className="text-[#1976D2]">{shipment.carrier_contact.email}</div>
              <div className="text-[#757575]">{shipment.carrier_contact.phone}</div>
            </div>
            <p className="text-[11px] text-[#9E9E9E] mt-2">
              Contact loaded from FreightPOP carrier directory
            </p>
          </div>

          {/* Section C: AI Email Draft */}
          <div className="border-2 border-[#EDE7F6] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AgentBadge />
              <span className="text-[12px] text-[#757575]">Drafted by Tracking Agent</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#757575] block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-[#E0E0E0] rounded px-3 py-2 text-[13px] text-[#212121] focus:outline-none focus:border-[#7E57C2] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#757575] block mb-1">
                  Email Body
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={12}
                  className="w-full border border-[#E0E0E0] rounded px-3 py-2 text-[13px] text-[#212121] focus:outline-none focus:border-[#7E57C2] transition-colors resize-none font-mono leading-relaxed"
                />
              </div>

              <button
                onClick={handleRegenerate}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#7E57C2] hover:text-[#6a47a8] transition-colors"
              >
                <RefreshCw size={13} />
                Regenerate
              </button>
            </div>
          </div>
        </div>

        {/* Section D: Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#E0E0E0] bg-white px-5 py-4 flex items-center gap-3">
          <button
            onClick={handleApprove}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2196F3] text-white text-[13px] font-semibold uppercase tracking-wide px-5 py-2.5 rounded hover:bg-[#1976D2] transition-colors"
          >
            <Send size={14} />
            Approve &amp; Send
          </button>
          <button className="inline-flex items-center justify-center border border-[#2196F3] text-[#2196F3] text-[13px] font-semibold uppercase tracking-wide px-4 py-2.5 rounded hover:bg-[#E3F2FD] transition-colors">
            Save Draft
          </button>
          <button
            onClick={onClose}
            className="text-[13px] text-[#757575] hover:text-[#212121] transition-colors px-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
