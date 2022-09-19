const s = require('superstruct')

const VirtualOrder = s.object({
    type: s.literal('virtual-order')
})

module.exports = {
    VirtualOrder: VirtualOrder
}