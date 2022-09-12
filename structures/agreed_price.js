const s = require('superstruct')

const AgreedPrice = s.object({
    type: s.literal('agreed-price')
})

module.exports = {
    AgreedPrice: AgreedPrice
}