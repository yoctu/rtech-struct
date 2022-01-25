const s = require('superstruct')

const Tz = s.define('Tz', value => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value }).format()
    return true
  } catch (e) {
    return false
  }
})

module.exports = {
  Tz: Tz
}
