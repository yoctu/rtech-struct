const s = require('superstruct');
const { ZuluDateTimeStruct } = require('./lib');
const uuid = require('uuid');
const isUuid = require('is-uuid');

const Uuid = s.define('Uuid', isUuid.v4);

const Message = s.type({
    id: s.defaulted(Uuid, uuid.v4),
    date: s.defaulted(ZuluDateTimeStruct, () => new Date().toISOString()),
    type: s.defaulted(s.literal('message'), 'message'),
    channel: s.optional(s.string()),
    key: s.string(),
    subject: s.string(),
    message: s.string(),
    status: s.string(),
    from: s.string(),
    source: s.array(s.string()),
    target: s.array(s.string())
});

module.exports = {
    Message
};
