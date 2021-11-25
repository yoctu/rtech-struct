const address = require('./address')
const carrier = require('./carrier')
const contact = require('./contact')
const driver = require('./driver')
const pck = require('./package')
const point = require('./point')
const transport = require('./transport')
const vehicle = require('./vehicle')
const event = require('./event')
const messageAt = require('./messageAt')
const pointDates = require('./pointDates')
const vehiclePosition = require('./vehiclePosition')

module.exports = {
    address,
    carrier,
    contact,
    driver,
    'package': pck,
    point,
    transport,
    vehicle,
    event,
    messageAt,
    pointDates,
    vehiclePosition
}
