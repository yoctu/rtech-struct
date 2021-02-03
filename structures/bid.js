const s = require('superstruct')
const Uuid = s.define('Uuid', require('is-uuid').v4)
const Url = s.define('Url', require('is-url'))
const Email = s.define('Email', require('is-email'))
const ZoulouDate = require('./lib').zouloudate(s)
const Instance = process.env.NODE_APP_INSTANCE || 'DEMO'

exports.bid = function(config = null, auction = null) {
  let InstanceName = Instance
  let Score = [ 0, 0 , 0 ]
  let Rating = 3
  let Validatoremail = "shaq@yoctu.com"
  let Logo = 'https://www.yoctu.com/wp-content/themes/yoctu/images/logo.svg'
  if (config && config.app && config.app.usercodename) InstanceName = Instance
  if (config && config.score) Score = config.score
  if (config && config.shaq && config.shaq.rating) Rating = config.shaq.rating
  if (config && config.shaq && config.app.validatoremail) Validatoremail = config.app.validatoremail
  if (config && config.app && config.app.logourl) Logo = config.app.logourl + Instance + '.png'

  return s.defaulted(
    s.type({
      id: s.optional(Uuid),
      type: s.string(),
      key: s.size(s.string(), 8, 128),
      from: s.size(s.string(), 0, 128),
      status: s.enums(['created', 'cancelled', 'running', 'expired', 'declined', 'forwarded', 'authorized']),
      reported_at: ZoulouDate,
      archived_at: s.optional(ZoulouDate),
      valid_until: ZoulouDate,
      creator: s.size(s.string(), 2, 32),
      source: s.size(s.array(s.size(s.string(), 2, 64)), 0, 1),
      sourceComment: s.optional(s.size(s.array(s.size(s.string(), 2, 256)), 0, 8)),
      target: s.size(s.array(s.size(s.string(), 2, 64)), 0, 1),
      targetComment: s.optional(s.size(s.array(s.size(s.string(), 2, 256)), 0, 8)),
      targetRating: s.optional(s.size(s.number(), 0, 5)),
      bidRating: s.optional(s.size(s.number(), 0, 5)),
      logo: s.optional(Url),
      validatorEmails: s.optional(Email),
      currency: s.enums(['EUR', 'DOLLAR']),
      puPlace: s.optional(s.size(s.array(s.size(s.string(), 2, 256)), 5, 6)),
      puDate: s.optional(ZoulouDate),
      puDateRange: s.optional(ZoulouDate),
      dePlace: s.optional(s.size(s.array(s.size(s.string(), 2, 256)), 5, 6)),
      deDate: s.optional(ZoulouDate),
      deDateRange: s.optional(ZoulouDate),
      files: s.optional(s.array(s.string())),
      vehicle: s.optional(s.array(s.string())),
      lang: s.optional(s.string()),
      forwarder: s.optional(s.string()),
      decision_maker: s.optional(s.string()),
      loaded: s.optional(s.boolean()),
      tracker: s.optional(s.string()),
      driver: s.optional(s.string()),
      score: s.optional(s.array(s.number())),
      tms: s.optional(s.string()),
      price: s.union([s.number(), s.string()]),
      priceDetails: s.optional(s.array(s.string()))
    }), {
      id: require('uuid').v4(),
      key: auction && auction.key ? auction.key : "",
      auction: auction && auction.key ? auction.key : "",
      tms: auction && auction.creator ? auction.creator : "",
      creator: 'DEMO',
      reported_at: (new Date()).toISOString(),
      valid_until: auction && auction.valid_until ? auction.valid_until : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      type: 'bid',
      status: 'created',
      from: Instance,
      driver: Instance,
      tracker: 'ftk',
      source: [Instance],
      score: Score,
      targetRating: Rating,
      target: auction && auction.source ? auction.source : '',
      currency: auction && auction.currency ? auction.currency : 'EUR',
      puPlace: auction && auction.puPlace? auction.puPlace : ['NA', 'NA', 'NA', 'NA', 'NA'],
      puDate: auction && auction.puDate ? auction.puDate : new Date().toISOString(),
      puDateRange: auction && auction.puDateRange ? auction.puDateRange : new Date().toISOString(),
      dePlace: auction && auction.dePlace ? auction.dePlace : ['NA', 'NA', 'NA', 'NA', 'NA'],
      deDate: auction && auction.deDate ? auction.deDate : new Date().toISOString(),
      deDateRange: auction && auction.deDateRange ? auction.deDateRange : new Date().toISOString(),
      validatorEmails: Validatoremail,
      logo: Logo
    })
}
