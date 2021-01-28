
exports.address = function (config = null) {
  return require('./structures/address').address
}

exports.contact = function (config = null) {
  return require('./structures/contact').contact
}

exports.fleet = function (config = null) {
  return require('./structures/fleet').fleet
}

exports.vehicle = function (config = null) {
  return require('./structures/fleet').vehicle
}

exports.auctionContact = function (config = null) {
  return require('./structures/contact').auctionContact
}

exports.rel = function (config = null) {
  return require('./structures/rels').rel
}

exports.rels = function (config = null) {
  return require('./structures/rels').rels
}

exports.point = function (config = null) {
  return require('./structures/transport').point
}

exports.package = function (config = null) {
  return require('./structures/transport').package
}

exports.transport = function (config = null) {
  return require('./structures/transport').transport
}

exports.auction = function (config = null) {
  return require('./structures/auction').auction(config)
}
