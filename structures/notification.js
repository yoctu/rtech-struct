const s = require('superstruct')
const uuid = require('uuid')
const isUuid = require('is-uuid')
const uuidStruct = s.define('uuid', isUuid.v4)

const Notification = s.defaulted(
  s.type({
    content: s.object(),
    type: s.string(),
    id: s.optional(uuidStruct),
    createdAt: s.optional(s.string())
  }), {
    id: () => uuid.v4(),
    createdAt: () => new Date().toISOString()
})

module.exports = {
    notification: Notification,
}
