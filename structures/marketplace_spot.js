const s = require('superstruct')
const { NoEmptyString } = require('./string')

const MarketplaceSpot = s.object({
    type: s.literal('marketplace_spot'),
    delegated_target: s.size(s.array(NoEmptyString), 1),
})

module.exports = {
    MarketplaceSpot: MarketplaceSpot
}