const s = require('superstruct')

const NoEmptyString = s.refine(s.string(), 'NoEmptyString', (value) => {
  return value.length > 0
})

module.exports = {
  NoEmptyString: NoEmptyString
}
