const s = require('superstruct')
const Uuid = s.define('Uuid', require('is-uuid').v4)
const Url = s.define('Url', require('is-url'))
const ZoulouDate = require('./lib').zouloudate(s)
const GpsA = require('./lib').gpsarray(s)
const GpsS = require('./lib').gpsstring(s)
const Place = require('./place').place(s)
const PlaceTZ = require('./place').placeTZ(s)
const {multistep, packageV2, packageV1} = require('./multistep')
const Contact = require('./contact').auctionContact

const Instance = process.env.NODE_APP_INSTANCE || 'DEMO'

exports.auction = function (config = null) {
  let InstanceName = Instance
  let RelsMax = 10
  if (config && config.app && config.app.usercodename) InstanceName = Instance
  if (config && config.shaq && config.shaq.relsmax) RelsMax = config.shaq.relsmax

  return s.defaulted(
    s.type({
      id: s.optional(Uuid),
      type: s.string(),
      key: s.size(s.string(), 8, 128),
      name: s.size(s.string(), 8, 128),
      status: s.enums(['created', 'cancelled', 'running', 'completed', 'expired', 'failed', 'searching', 'searched', 'validated']),
      reported_at: ZoulouDate,
      archived_at: s.optional(ZoulouDate),
      tracking_url: s.optional(Url),
      valid_until: ZoulouDate,
      valid_from: ZoulouDate,
      waybills: s.optional(s.size(s.string(), 8, 256)),
      creator: s.size(s.string(), 2, 32),
      visible: s.enums(['public', 'private']),
      options: s.optional(s.array(s.enums(['SHAQUPLOAD', 'BIDUPLOAD', 'AUTOINVITE', 'BIDCOMMENT', 'NOCHAT', 'LITE', 'PRICE_DETAIL', 'SHOW_CONTACT', 'PKG_V1', 'PKG_V2', 'MULTISTEP']))),
      source: s.size(s.array(s.size(s.string(), 2, 64)), 0, 1),
      target: s.size(s.array(s.size(s.string(), 2, 64)), 0, RelsMax),
      targetStatus: s.optional(s.size(s.array(s.enums(['', 'Removed', 'Disabled', 'Searching', 'NoSolution'])), 0, RelsMax)),
      sourceName: s.optional(s.size(s.array(s.size(s.string(), 2, 128)), 0, 1)),
      sourceOwner: s.optional(s.size(s.array(s.size(s.string(), 2, 128)), 0, 1)),
      targetName: s.optional(s.size(s.array(s.size(s.string(), 2, 128)), 0, RelsMax)),
      targetOwner: s.optional(s.size(s.array(s.size(s.string(), 2, 128)), 0, RelsMax)),
      currency: s.enums(['EUR', 'DOLLAR']),
      bestbidprice: s.optional(s.number()),
      bestbid: s.optional(Uuid),
      getitnow: s.optional(s.number()),
      winningbid: s.optional(Uuid),
      puPlace: s.dynamic((v, p) => { return v && v.length === 5 ? Place : PlaceTZ }),
      puLocation: s.optional(s.union([GpsA, GpsS])),
      puContact: s.optional(Contact),
      puDate: ZoulouDate,
      extras: s.defaulted(s.optional(s.array(s.string())), []),
      puDateRange: s.optional(ZoulouDate),
      dePlace: s.dynamic((v, p) => { return v && v.length === 5 ? Place : PlaceTZ }),
      deLocation: s.optional(s.union([GpsA, GpsS])),
      deContact: s.optional(Contact),
      deDate: ZoulouDate,
      deDateRange: s.optional(ZoulouDate),
      files: s.optional(s.array(s.string())),
      vehicles: s.optional(s.array(s.string())),
      incoterm: s.optional(s.enums(['EXW', 'CIP', 'FCA', 'DAP', 'DPU', 'CPT', 'DDP', 'FAS', 'CFR', 'FOB', 'CIF'])),
      transport: s.optional(s.array(s.string())),
      dimension: s.dynamic((v,p) => {
          const options = p.branch.map(e => e.hasOwnProperty('options') ? e.options: [])[0]
          switch (true) {
              case options.includes('MULTISTEP'):
                  return multistep(config)
              case options.includes('PKG_V1'):
                  return packageV1
              case options.includes('PKG_V2'):
                  return packageV2
              default:
                  return packageV1
          }
      }),
      stackable: s.optional(s.enums(['yes', 'no', 'No', 'Yes', 0, 1])),
      distance: s.optional(s.union([s.number(), s.string()])),
      notes: s.optional(s.size(s.string(), 2, 512))
    }), {
    id: require('uuid').v4(),
    key: require('uuid').v4(),
    options: [],
    creator: 'DEMO',
    visible: 'private',
    reported_at: (new Date()).toISOString(),
    valid_until: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    valid_from: (new Date()).toISOString(),
    decision_until: (new Date()).toISOString(),
    type: 'auction',
    name: Instance + new Date().getTime(),
    status: 'created',
    currency: 'EUR',
    source: [Instance],
    sourceName: [InstanceName],
    target: [],
    vehicles: []
  })
}
