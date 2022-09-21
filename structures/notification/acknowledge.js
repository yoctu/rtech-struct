const s = require('superstruct')
const isUuid = require('is-uuid')
const uuidStruct = s.define('uuid', isUuid.v4)

const structure = s.defaulted(
    s.type({
      notificationsIds: s.array(uuidStruct),
      name: s.string(),
    }))

module.exports = { structure }
