const s = require('superstruct')

const OrderType = s.object({
    type: s.enums(['getitnow', 'marketplace_spot', 'virtual_order']),
    delegated_target: s.optional(s.array(s.string()))
})

module.exports = {
    OrderType: OrderType
}