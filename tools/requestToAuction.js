const calcDistance = (transports) => {
    let result = 0

    for (const transport of transports) {
        for (const distance of transport.distances) {
            result += distance
        }
    }

    return result
}

const placeInfo = (point, suffix) => {
    return {
        [suffix + 'Place']: [
            point.address.street || '',
            point.address.zip_code,
            point.address.city,
            point.address.country,
            point.address.country,
            point.address.timezone_string,
        ],
        [suffix + 'Contact']: [
            point.contact.company_name || 'John',
            point.contact.name || 'Doe',
            point.contact.email || 'todoemail@mail.fr',
            point.contact.phone || '+333333333',
        ],
        [suffix + 'Date']: point.arrival_from,
        [suffix + 'DateRange']: point.arrival_until,
        [suffix + 'Location']: [
            point.address.position.lat.toString(),
            point.address.position.lon.toString()
        ],
    }
}

const dimension = (key, points, packages) => {
    let result = []

    for (const p of packages) {
        result.push(p.quantity.toString())
        result.push(p.length.toString())
        result.push(p.width.toString())
        result.push(p.height.toString())
        result.push(p.weight.toString())
        result.push(p.comment || '')
        result.push(p.stackable || '')
        result.push(
            p.adr ? (p.adr.class + ',' + p.adr.un_code + ',' + p.adr.packing_group) : ''
        )
        result.push(
            p.goods_value ?  p.goods_value.value.toString() : ''
        )
        result.push('')
        for (const point of points) {
            if (point.package_to_load.includes(p.tracking_id) ||
                point.package_to_unload.includes(p.tracking_id)) {
                result.push(key + '-' + point.key)
                result.push(point.address.street || '')
                result.push(point.address.zip_code)
                result.push(point.address.city)
                result.push(point.address.country)
                result.push(point.address.country)
                result.push(
                    point.address.position.lat.toString() +
                    ',' +
                    point.address.position.lon.toString()
                )
                result.push(point.address.timezone_string)
                result.push(point.contact.company_name || '')
                result.push(point.contact.name || '')
                result.push(point.contact.email || '')
                result.push(point.contact.phone || '')
                result.push(point.arrival_from)
                result.push(point.arrival_until)
            }
        }
    }
    return result
}

const requestToAuction = (request) => {
    return {
        key: request.key,
        name: request.key,
        target: request.target,
        creator: request.creator,
        source: request.source,
        distance: calcDistance(request.transports),
        options: ['MULTISTEP'],
        ...placeInfo(request.points.find((point) => point.key === 'A'), 'pu'),
        ...placeInfo(request.points.find((point) => point.key === 'B'), 'de'),
        dimension: dimension(request.key, request.points, request.packages),
    }
}

module.exports = requestToAuction
