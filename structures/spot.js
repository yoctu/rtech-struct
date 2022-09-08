const s = require('superstruct')

const Spot = s.object({
    type: s.literal('spot')
})

module.exports = {
    Spot: Spot
}