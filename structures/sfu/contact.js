const s = require('superstruct');
const isEmail = require('is-email');

const Email = s.define('Email', isEmail);

const Contact = s.object({
  phone: s.optional(s.size(s.string(), 1, 32)),
  company_name: s.size(s.string(), 1, 64),
  name: s.optional(s.size(s.string(), 1, 64)),
  email: s.optional(Email)
});

module.exports = {
  contact: Contact
}
