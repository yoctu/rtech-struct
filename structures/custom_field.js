const s = require('superstruct')

const CustomField = s.object({
  label: s.size(s.string(), 1, 255),
  value: s.optional(s.size(s.string(), 0, 2000))
})

module.exports = {
  CustomField: CustomField
}
