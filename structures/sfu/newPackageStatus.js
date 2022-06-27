const s = require('superstruct')

const NewPackageStatus = s.object({
  status: s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered', 'waiting_for_pickup/position_needed', 'waiting_for_pickup/waiting_pickup', 'waiting_for_pickup/wrong_pickup_location', 'picked_up/position_needed', 'picked_up/waiting_delivery', 'picked_up/wrong_delivery_location']),
  message: s.size(s.string(), 0, 256)
})

module.exports = {
  newPackageStatus: NewPackageStatus,
}
