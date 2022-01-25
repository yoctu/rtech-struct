const s = require('superstruct')
const Email = s.define('Email', require('is-email'))

const Requester = s.object({
    name: s.size(s.string(), 2, 128),
    email: Email,
    phone: s.optional(s.size(s.string(), 1, 256)),
    firstname: s.size(s.string(), 2, 128)
})

module.exports = {
    Requester: Requester
}
