const s = require('superstruct')
const IsoDate = require('../lib').isodate(s)

const MESSAGE_AT_SIZE_MAX = 256

const MessageAt = s.object({
  at: s.defaulted(s.optional(IsoDate), (new Date()).toISOString()),
  message: s.size(s.string(), 0, MESSAGE_AT_SIZE_MAX)
})

module.exports = {
  messageAt: MessageAt,

  MESSAGE_AT_SIZE_MAX
}
