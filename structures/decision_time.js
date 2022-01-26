const s = require('superstruct')
const { DateTime } = require('./date')
const { isodatetime } = require('./lib');

const DecisionTime = s.object({
    decision_from: isodatetime(),
    close_after: s.defaulted(s.boolean(), () => false)
})

module.exports = {
    DecisionTime: DecisionTime
}