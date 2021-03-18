const s = require('superstruct')

const Multistep = s.size(s.array(s.string()), 27, Infinity)
const PackageV1 = s.size(s.array(s.string()), 6)
const PackageV2 = s.size(s.array(s.string()), 9)

module.exports = {
  packageV1: PackageV1,
  packageV2: PackageV2,
  multistep: Multistep
}
