const s = require('superstruct')
const { NoEmptyString } = require('./string')

const MarketplaceSpot = s.object({
    type: s.literal('marketplace-spot'),
    delegated_target: s.array(NoEmptyString),
})

module.exports = {
    MarketplaceSpot: MarketplaceSpot
}