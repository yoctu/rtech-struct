const s = require('superstruct')
const { NoEmptyString } = require('./string')

const Email = s.define('Email', require('is-email'))

const PartialContact = s.object({
  company_name: s.optional(NoEmptyString),
  email: s.optional(Email),
  name: s.optional(NoEmptyString),
  phone: s.optional(NoEmptyString)
})

module.exports = {
  PartialContact: PartialContact
}
