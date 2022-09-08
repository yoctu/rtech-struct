import Package from './Package';
import PartialPoint from './PartialPoint';
import RequestedTransport from './RequestedTransport';
import Reference from './Reference';
import CustomerInterlocutor from './CustomerInterlocutor';
import CustomField from './CustomField';
import Invoice from './Invoice';
import GetItNow from './GetItNow';
import Spot from './Spot';
import AgreedPrice from './AgreedPrice';
import MarketplaceSpot from './MarketplaceSpot';
import VirtualOrder from './VirtualOrder';
import ValidityTime from './ValidityTime';

type Request = {
    key?: string,
    source: string[],
    packages: Package[],
    points: PartialPoint[],
    transports: RequestedTransport[],
    extras?: string[],
    references?: Reference[],
    customer_interlocutor?: CustomerInterlocutor,
    custom_fields?: CustomField[],
    invoice?: Invoice,
    order_type?: Spot | AgreedPrice | VirtualOrder | MarketplaceSpot | GetItNow,
    validity_time?: ValidityTime,
    issuer?: string,
    creator?: string,
    target?: string[],
    comment?: string,
};

export default Request;
