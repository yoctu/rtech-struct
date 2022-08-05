type ADR = {
    un_code: string,
    class: string,
    packing_group: string,
};

type GoodValue = {
    currency: string,
    value: number,
};

type Issue = 'WAITING_ON_PU' |
    'WAITING_ON_DE' |
    'LATE_FOR_PU_PLANNED' |
    'LATE_FOR_DE_PLANNED' |
    'WRONG_PU_LOCATION' |
    'WRONG_DE_LOCATION' |
    'POSITION_NEEDED_BEFORE_PU' |
    'POSITION_NEEDED_BEFORE_DE'
;

type Package = {
    tracking_id: string,
    owner: string,
    status: 'waiting_for_pickup' | 'pickup_delayed' | 'picked_up' | 'delivery_delayed' | 'delivered',
    issues: Issue[],
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

export { ADR, GoodValue, Issue };
export default Package;
