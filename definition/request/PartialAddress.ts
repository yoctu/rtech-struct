import Position from './Position';

type PartialAddress = {
    street?: string,
    additional_street?: string,
    city: string,
    country: string,
    position: Position,
    timezone_string: string,
    zip_code: string,
    instruction?: string,
};

export default PartialAddress;
