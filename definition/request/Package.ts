import Adr from './Adr';

type Package = {
    tracking_id: string,
    owner: string,
    height: number,
    length: number,
    width: number,
    weight: number,
    stackable: 'no' | '1' | '2' | '3' | '4',
    quantity: number,
    package_type: 'parcel' | 'pallet',
    references: string[],
    adr?: Adr,
    status?: 'waiting_for_pickup' | 'pickup_delayed' | 'picked_up' | 'delivery_delayed' | 'delivered' | 'waiting_for_pickup/position_needed' | 'waiting_for_pickup/waiting_pickup' | 'waiting_for_pickup/wrong_pickup_location' | 'picked_up/position_needed' | 'picked_up/waiting_delivery' | 'picked_up/wrong_delivery_location',
    comment?: string,
};

export default Package;
