const s = require('superstruct')
const uuid = require('uuid')
const isUuid = require('is-uuid')
const uuidStruct = s.define('uuid', isUuid.v4)

const Filter = s.defaulted(
  s.type({
    id: s.optional(uuidStruct),
    label: s.size(s.string(), 2, 64),
    data: s.object(),
  }),
  () => ({
    id: uuid.v4()
  })
)

const Filters = s.array(Filter)

module.exports = {
  filter: Filter,
  filters: Filters,
}
