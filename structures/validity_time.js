const s = require('superstruct')
const { DateTime } = require('./date')

const ValidityTime = s.object({
    valid_from: s.optional(DateTime),
    valid_until: s.optional(DateTime)
})

module.exports = {
    ValidityTime: ValidityTime
}