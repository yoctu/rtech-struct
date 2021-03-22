const s = require('superstruct')

const MAX_PKG = 50

const Multistep = s.size(s.array(s.string()), 36, 36*MAX_PKG)
const PackageV1 = s.size(s.array(s.string()), 6)
const PackageV2 = s.size(s.array(s.string()), 9)

module.exports = {
  packageV1: PackageV1,
  packageV2: PackageV2,
  multistep: Multistep
}
