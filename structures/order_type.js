const s = require('superstruct')

const OrderType = s.object({
    type: s.enums(['getitnow'])
})

module.exports = {
    OrderType: OrderType
}