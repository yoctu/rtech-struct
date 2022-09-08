const s = require('superstruct')

const MarketplaceSpot = s.object({
    type: s.literal('marketplace_spot')
})

module.exports = {
    MarketplaceSpot: MarketplaceSpot
}