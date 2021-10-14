const s = require('superstruct');
const isEmail = require('is-email')

const Email = s.define('Email', isEmail);

const PHONE_SIZE_MIN = 1;
const PHONE_SIZE_MAX = 256;

const NAME_SIZE_MIN = 1;
const NAME_SIZE_MAX = 256;

const COMPANY_NAME_SIZE_MIN = 1;
const COMPANY_NAME_SIZE_MAX = 256;

const Contact = s.object({
  phone: s.optional(s.size(s.string(), PHONE_SIZE_MIN, PHONE_SIZE_MAX)),
  company_name: s.size(s.string(), NAME_SIZE_MIN, NAME_SIZE_MAX),
  name: s.optional(s.size(s.string(), COMPANY_NAME_SIZE_MIN, COMPANY_NAME_SIZE_MAX)),
  email: s.optional(Email)
});

module.exports = {
  contact: Contact,

  PHONE_SIZE_MIN,
  PHONE_SIZE_MAX,

  NAME_SIZE_MIN,
  NAME_SIZE_MAX,

  COMPANY_NAME_SIZE_MIN,
  COMPANY_NAME_SIZE_MAX
}
