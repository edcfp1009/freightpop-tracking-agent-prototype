import { Shipment } from '@/lib/types';
import data from '@/public/mock_shipments.json';

const raw = data as { shipments: unknown[] };
export const allShipments: Shipment[] = raw.shipments as Shipment[];
