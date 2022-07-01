type Position = {
    lat: number,
    lon: number,
};

type Address = {
    street: string,
    additional_street?: string,
    city: string,
    zip_code: string,
    province?: string,
    country: string,
    timezone_string: string,
    position: Position,
    type: 'sfu/address',
};

export { Position };
export default Address;
