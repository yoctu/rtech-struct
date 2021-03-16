const s = require('superstruct')

const multistep_package = s.size(s.array(s.string()), 13)
const multistep_address = s.size(s.array(s.string()), 11)

const Multistep = s.size(s.array(s.string()), 27, Infinity)

module.exports = {
  multistep_address,
  multistep_package,
  multistep: Multistep
}
