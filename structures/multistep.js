const s = require('superstruct')

const Multistep = function (config = null) {
  let MaxSteps = 50
  if (config && config.shaq && config.shaq.maxsteps) MaxSteps = config.shaq.maxsteps

  return s.size(s.array(s.string()), 38, 38 * MaxSteps)
}

const PackageV1 = s.refine(
    s.array(s.size(s.string(), 0,64)),
    'PackageV1',
    (value) => {
        return value.length >= 6 && (value.length % 6 === 0)
    })

const PackageV2 = s.refine(
    s.array(s.size(s.string(), 0,64)),
    'PackageV2',
    (value) => {
      return value.length >= 9 && (value.length % 9 === 0)
    })

module.exports = {
  packageV1: PackageV1,
  packageV2: PackageV2,
  multistep: Multistep
}
