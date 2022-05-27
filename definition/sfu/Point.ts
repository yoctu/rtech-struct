import Address from './Address';
import Contact from './Contact';

export default interface Point {
    key: string,
    address: Address,
    point_types?: string[],
    type: 'sfu/point',
    arrival_from: string,
    arrival_until?: string,
    real_arrival?: string,
    real_departure?: string,
    contact?: Contact,
    packages_to_load: string[],
    packages_to_unload: string[],
    comment?: string,
}
