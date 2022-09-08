const s = require('superstruct')

const VirtualOrder = s.object({
    type: s.literal('virtual_order')
})

module.exports = {
    VirtualOrder: VirtualOrder
}