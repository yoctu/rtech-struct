const s = require('superstruct')
const Email = s.define('Email', require('is-email'))

const CustomerInterlocutor = s.object({
  firstname: s.optional(s.string()),
  lastname: s.optional(s.string()),
  email: Email
})

module.exports = {
    CustomerInterlocutor: CustomerInterlocutor
}