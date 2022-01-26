const s = require('superstruct')
const { DateTime } = require('./date')
const { DecisionTime } = require('./decision_time');

const ValidityTime = s.object({
    valid_from: s.optional(DateTime),
    valid_until: s.optional(DateTime),
    decision_time: s.optional(DecisionTime)
})

module.exports = {
    ValidityTime: ValidityTime
}