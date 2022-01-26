const s = require('superstruct')
const { DateTime } = require('./date')
const { isodate } = require('./lib');

const DecisionTime = s.object({
    decision_from: isodate(),
    close_after: s.defaulted(s.boolean(), () => false)
})

module.exports = {
    DecisionTime: DecisionTime
}