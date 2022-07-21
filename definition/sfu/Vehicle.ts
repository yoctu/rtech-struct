import Carrier from './Carrier';
import Driver from './Driver';
import VehiclePosition from './VehiclePosition';

type Vehicle = {
    carrier: Carrier,
    drivers?: Driver[],
    tracking_provider: string,
    plate: string,
    vehicle_type: string,
    type: 'sfu/vehicle',
    information?: string,
    brand?: string,
    packages: string[],
    last_position?: VehiclePosition
};

export default Vehicle;
