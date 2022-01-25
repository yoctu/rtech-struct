const s = require('superstruct')
const { PositiveNumber } = require('./number')

const GetItNow = s.object({
    type: s.enums(['getitnow']),
    amount: PositiveNumber
})

module.exports = {
    GetItNow: GetItNow
}