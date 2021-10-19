const s = require('superstruct')
const Email = s.define('Email', require('is-email'))
const Phone = require('./lib').phone(s)

const Contact = s.object({
  company: s.size(s.string(), 1, Infinity),
  name: s.size(s.string(), 1, Infinity),
  phone: s.size(s.string(), 1, Infinity),
  email: s.string(Email)
})

const AuctionContact = s.tuple([s.size(s.string(), 1, 64), s.size(s.string(), 1, 64), Email, Phone])

module.exports = {
  contact: Contact,
  auctionContact: AuctionContact
}
