
module.exports = {
  address: require('./structures/address').address,
  contact: require('./structures/contact').contact,
  auctionContact: require('./structures/contact').auctionContact,
  rel: require('./structures/rels').rel,
  rels: require('./structures/rels').rels,
  point: require('./structures/transport').point,
  package: require('./structures/transport').package,
  transport: require('./structures/transport').transport
}

