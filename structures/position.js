const s = require('superstruct')

const Position = s.object({
  lat: s.size(s.number(), -90, 90),
  lon: s.size(s.number(), -180, 180)
})

module.exports = {
  Position: Position
}
