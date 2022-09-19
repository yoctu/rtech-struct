const calcDistance = (transports) => {
    let result = 0

    for (const transport of transports) {
        for (const distance of transport.distances) {
            result += distance
        }
    }

    return result
}

const pointInfo = (point, suffix, defaultOption) => {
    const place = [
        point.address.street || '',
        point.address.zip_code,
        point.address.city,
        point.address.country,
        point.address.country,
        point.address.timezone_string,
    ]

    if (point.address.additional_street) place.push(point.address.additional_street)

    return {
        [suffix + 'Place']: place,
        [suffix + 'Contact']: [
            point.contact.company_name || defaultOption.company_name,
            point.contact.name || defaultOption.name,
            point.contact.email || defaultOption.email,
            point.contact.phone || defaultOption.phone,
        ],
        [suffix + 'Date']: point.arrival_from,
        [suffix + 'DateRange']: point.arrival_until,
        [suffix + 'Location']: [
            point.address.position.lat.toString(),
            point.address.position.lon.toString()
        ],
    }
}

const dimension = (key, points, packages, defaultOption) => {
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
                result.push(
                    (point.address.street || '') +
                    (point.address.additional_street ? '\n' + point.address.additional_street : '')
                )
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
                result.push(point.contact.company_name || defaultOption.company_name)
                result.push(point.contact.name || defaultOption.name)
                result.push(point.contact.email || defaultOption.email)
                result.push(point.contact.phone || defaultOption.phone)
                result.push(point.arrival_from)
                result.push(point.arrival_until)
            }
        }
    }
    return result
}

const checkValidityTime = (time) => {
    if (!time) return time

    return {
        valid_from: time.valid_from,
        valid_until: time.valid_until,
        decision_from: time.decision_time ? time.decision_time.decision_from : undefined
    }
}

const requestToAuction = (request, defaultOption = {}) => {
    return {
        key: request.key,
        name: request.key,
        target: request.target,
        creator: request.creator,
        source: request.source,
        distance: calcDistance(request.transports),
        options: ['MULTISTEP'],
        ...pointInfo(request.points.find((point) => point.key === 'A'), 'pu', defaultOption),
        ...pointInfo(request.points.find((point) => point.key === 'B'), 'de', defaultOption),
        dimension: dimension(request.key, request.points, request.packages, defaultOption),
        ...checkValidityTime(request.validity_time),
        notes: request.comment,
        extras: request.extras,
        incoterm: request.transports[0].incoterm,
        vehicles: request.transports[0].vehicles
    }
}

module.exports = requestToAuction
