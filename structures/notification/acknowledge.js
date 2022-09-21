const s = require('superstruct')
const isUuid = require('is-uuid')
const uuidStruct = s.define('uuid', isUuid.v4)

const structure = s.object(
    s.type({
      notificationsIds: s.size(s.array(uuidStruct), 1),
      name: s.string(),
    }))

module.exports = { structure }
