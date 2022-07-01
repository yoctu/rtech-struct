import Package from './Package';
import Point from './Point';
import Vehicle from './Vehicle';

type Transport = {
    id: string,
    key: string,
    type: 'sfu/transport',
    status: 'planned' | 'cancelled' | 'running' | 'completed' | 'expired',
    source: string,
    packages: Package[],
    points: Point[],
    vehicles?: Vehicle[],
    distances?: number[],
    waybill?: string,
    tracking_url?: string,
    incoterm?: string,
    creator: string,
};

export default Transport;
