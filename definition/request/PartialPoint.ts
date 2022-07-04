import PartialAddress from './PartialAddress';
import PartialContact from './PartialContact';

type PartialPoint = {
    key: string,
    arrival_from: string,
    arrival_until: string,
    address: PartialAddress,
    contact?: PartialContact,
    package_to_load: string[],
    package_to_unload: string[],
};

export default PartialPoint;
