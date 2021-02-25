const s = require('superstruct')
const Tz = s.define('Tz', require('timezone-validator'))

const PlaceV1 = s.tuple([s.size(s.string(), 2, 128), s.size(s.string(), 1, 32), s.size(s.string(), 2, 64), s.size(s.string(), 2, 32), s.size(s.string(), 2, 32)])
const PlaceV2 = s.tuple([s.size(s.string(), 2, 128), s.size(s.string(), 1, 32), s.size(s.string(), 2, 64), s.size(s.string(), 2, 32), s.size(s.string(), 2, 32), Tz])
const Place = s.union([ PlaceV1, PlaceV2 ])

module.exports = {
  place: Place
}
