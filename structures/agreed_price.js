const s = require('superstruct')

const AgreedPrice = s.object({
    type: s.literal('agreed_price')
})

module.exports = {
    AgreedPrice: AgreedPrice
}