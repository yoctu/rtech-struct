export interface Position {
    lat: number,
    lon: number,
}

export default interface Address {
    street: string,
    additional_street?: string,
    city: string,
    zip_code: string,
    province?: string,
    country: string,
    timezone_string: string,
    position: Position,
    type: 'sfu/address',
}
