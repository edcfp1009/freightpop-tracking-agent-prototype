export interface CarrierContact {
  name: string;
  email: string;
  phone: string;
}

export interface Shipment {
  id: string;
  tracking_number: string;
  carrier_name: string;
  carrier_service: string;
  carrier_connection: string;
  origin: string;
  destination: string;
  process_date: string;
  original_eta: string;
  updated_eta: string;
  current_status: string;
  tracking_status_label: 'ON-TIME' | 'LATE' | 'ISSUE';
  tracking_comment: string;
  direction: 'Outbound' | 'Inbound' | '3rd Party' | 'Return';
  agent_state: 'none' | 'needs_action' | 'awaiting_reply' | 'reply_received';
  issue_reason: string;
  last_known_location: string;
  hours_since_last_update: number;
  carrier_contact: CarrierContact;
}
