const s = require('superstruct')
const { package } = require('../package')

const Package = s.assign(
  package,
  s.object({
    status: s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered'])
  })
)

module.exports = {
  package: Package
}
