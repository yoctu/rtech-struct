const s = require('superstruct')
const Uuid = s.define('Uuid', require('is-uuid').v4)
const { ZuluDateTimeStruct } = require('./lib');

const Message = s.type({
    id: s.defaulted(Uuid, require('uuid').v4()),
    date: s.defaulted(ZuluDateTimeStruct, new Date().toISOString()),
    type: s.defaulted(s.enums(['message']), 'message'),
    channel: s.optional(s.string()),
    key: s.string(),
    subject: s.string(),
    message: s.string(),
    status: s.string(),
    from: s.string(),
    source: s.array(s.string()),
    target: s.array(s.string())
})

module.exports = {
    Message
}
