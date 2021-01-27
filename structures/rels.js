const s = require('superstruct')
const Url = s.define('Url', require('is-url'))
const Instance = process.env.NODE_APP_INSTANCE || 'DEMO'
const Domain = process.env.DNSDOMAIN || '.local'

const Rel = s.defaulted(
  s.type({
    key: s.size(s.string(), 2, 32),
    name: s.optional(s.size(s.string(), 2, 64)),
    url: s.optional(Url),
    autoinvite: s.optional(s.boolean())
  }), {
  name: Instance,
  url: 'http://' + Instance + Domain,
  autoinvite: false
})

const Rels = s.array(Rel)

module.exports = {
  rel: Rel,
  rels: Rels
}
