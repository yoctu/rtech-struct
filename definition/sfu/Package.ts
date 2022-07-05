type ADR = {
    un_code: string,
    class: string,
    packing_group: string,
};

type GoodValue = {
    currency: string,
    value: number,
};

type Package = {
    tracking_id: string,
    owner: string,
    status: 'waiting_for_pickup' | 'pickup_delayed' | 'picked_up' | 'delivery_delayed' | 'delivered' | 'waiting_for_pickup/position_needed' | 'waiting_for_pickup/waiting_pickup' | 'waiting_for_pickup/wrong_pickup_location' | 'picked_up/position_needed' | 'picked_up/waiting_delivery' | 'picked_up/wrong_delivery_location',
    stackable: 'no' | '1' | '2' | '3' | '4',
    quantity: number,
    references?: string[],
    length: number,
    width: number,
    height: number,
    weight: number,
    package_type: 'parcel' | 'pallet',
    type: 'sfu/package',
    adr?: ADR,
    comment?: string,
    good_value?: GoodValue,
};

export { ADR, GoodValue };
export default Package;
