const s = require('superstruct')
const { NoEmptyString } = require('./string')

const DateTime = s.pattern(
  s.string(),
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[\+|\-]{1}(\d{2}:\d{2}|\d{4}){1}){1}$/
)

module.exports = {
  DateTime: DateTime
}
