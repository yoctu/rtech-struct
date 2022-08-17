const s = require('superstruct')
const uuid = require('uuid')
const isUuid = require('is-uuid')
const uuidStruct = s.define('uuid', isUuid.v4)

const ENTITY_TYPE = 'notification/in-app'

const structure = s.defaulted(
    s.type({
        content: s.object(),
        type: s.optional(s.literal(ENTITY_TYPE)),
        notification_type: s.string(),
        id: s.optional(uuidStruct),
        createdAt: s.optional(s.string()),
        acknowledges: s.optional(s.array(s.string()))
    }), () => ({
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
        type: ENTITY_TYPE,
        acknowledges: []
    }))

module.exports = { structure }
