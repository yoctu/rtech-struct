const s = require('superstruct')

const Multistep = function (config = null) {
  let MaxSteps = 50
  if (config && config.shaq && config.shaq.maxsteps) MaxSteps = config.shaq.maxsteps

  return s.size(s.array(s.string()), 38, 38*MaxSteps)
}

const PackageV1 = s.dynamic((v, p) => { 
  if (!Array.isArray(v)) return s.never()
  if (v.length % 6 !== 0) return s.never()
  for (let i = 0; i < v.length / 6; i++) {
    if (isNaN(parseFloat(v[i*6])) || isNaN(parseFloat(v[i*6+1])) || isNaN(parseFloat(v[i*6+2])) || isNaN(parseFloat(v[i*6+3])) || isNaN(parseFloat(v[i*6+4]))) return s.never()
  }
  return s.size(s.array(s.size(s.string(), 0, 64)), 6, 60)
})

const PackageV2 = s.dynamic((v, p) => { 
  if (!Array.isArray(v)) return s.never()
  if (v.length % 9 !== 0) return s.never()
  for (let i = 0; i < v.length / 9; i++) {
    if (isNaN(parseFloat(v[i*9])) || isNaN(parseFloat(v[i*9+1])) || isNaN(parseFloat(v[i*9+2])) || isNaN(parseFloat(v[i*9+3])) || isNaN(parseFloat(v[i*9+4]))) return s.never()
  }
  return s.size(s.array(s.size(s.string(), 0, 64)), 9, 90)
})

module.exports = {
  packageV1: PackageV1,
  packageV2: PackageV2,
  multistep: Multistep
}
