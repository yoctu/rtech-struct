import Carrier from './Carrier';
import Driver from './Driver';

export default interface Vehicle {
    carrier: Carrier,
    drivers?: Driver[],
    tracking_provider: string,
    plate: string,
    vehicle_type: string,
    type: 'sfu/vehicle',
    information?: string,
    brand?: string,
    packages: string[],
}
