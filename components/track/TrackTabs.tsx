'use client';

const TABS = [
  'IN TRANSIT',
  'CONTAINER OCEAN',
  'CONTAINER DRAYAGE',
  'FLEET',
  'TRACK A SHIPMENT',
];

export default function TrackTabs() {
  return (
    <div className="flex border-b border-[#E0E0E0] bg-white">
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`h-12 px-4 text-[13px] font-semibold uppercase tracking-[0.5px] whitespace-nowrap transition-colors border-b-2 -mb-px ${
            tab === 'IN TRANSIT'
              ? 'text-[#2196F3] border-[#2196F3]'
              : 'text-[#757575] border-transparent hover:text-[#212121]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
