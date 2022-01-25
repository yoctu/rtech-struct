const s = require('superstruct')
const { getISOCode } = require('currency-iso')

const Currency = s.define('Currency', value => {
    return typeof getISOCode(value) != 'undefined'
})

module.exports = {
    Currency: Currency
}
