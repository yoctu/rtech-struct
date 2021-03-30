const s = require('superstruct')

const Multistep = function (config = null) {
  let MaxSteps = 50
  if (config && config.shaq && config.shaq.maxsteps) MaxSteps = config.shaq.maxsteps

  return s.size(s.array(s.string()), 38, 38*MaxSteps)
}

const PackageV1 = s.size(s.array(s.size(s.string(), 64)), 6)
const PackageV2 = s.size(s.array(s.size(s.string(), 64)), 9)

module.exports = {
  packageV1: PackageV1,
  packageV2: PackageV2,
  multistep: Multistep
}
