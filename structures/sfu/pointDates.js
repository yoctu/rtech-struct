const s = require('superstruct')
const IsoDate = require('../lib').isodate(s)

const ArrivalAt = s.object({
  arrival_at: IsoDate
})

const DepartureAt = s.object({
  departure_at: IsoDate
})

module.exports = {
  arrivalAt: ArrivalAt,
  departureAt: DepartureAt
}
