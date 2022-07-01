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
    status: 'waiting_for_pickup' | 'pickup_delayed' | 'picked_up' | 'delivery_delayed' | 'delivered',
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
