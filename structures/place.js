const s = require('superstruct')
const { Tz } = require('./lib')

exports.place = function (s) {
  return s.tuple([s.size(s.string(), 2, 128),s.size(s.string(), 1, 32),s.size(s.string(), 2, 64),s.size(s.string(), 2, 32),s.size(s.string(), 2, 32)])
}

exports.placeTZ = function (s) {
  return s.tuple([s.size(s.string(), 2, 128),s.size(s.string(), 1, 32),s.size(s.string(), 2, 64),s.size(s.string(), 2, 32),s.size(s.string(), 2, 32), s.optional(Tz)])
}
