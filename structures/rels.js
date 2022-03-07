const s = require('superstruct')
const Url = s.define('Url', require('is-url'))
const Instance = process.env.NODE_APP_INSTANCE || 'DEMO'
const { ZuluDateTimeStruct } = require('./lib');

const Rel = s.defaulted(
  s.object({
    key: s.size(s.string(), 2, 32),
    name: s.optional(s.size(s.string(), 2, 64)),
    url: s.optional(Url),
    timestamp: s.optional(ZuluDateTimeStruct),
    visible: s.optional(s.enums(['public', 'private'])),
    autoinvite: s.optional(s.boolean())
  }), {
  name: Instance,
  autoinvite: false,
  visible: 'private',
  timestamp: new Date().toISOString()
})

const Rels = s.array(Rel)

module.exports = {
  rel: Rel,
  rels: Rels
}
