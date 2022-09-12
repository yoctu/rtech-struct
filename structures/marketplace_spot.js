const s = require('superstruct')

const MarketplaceSpot = s.object({
    type: s.literal('marketplace_spot'),
    delegated_target: s.array(s.string())
})

module.exports = {
    MarketplaceSpot: MarketplaceSpot
}