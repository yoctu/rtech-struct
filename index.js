const { address } = require('./structures/address')
const { contact, auctionContact } = require('./structures/contact')
const { fleet } = require('./structures/fleet')
const { vehicle } = require('./structures/fleet')
const { rel, rels } = require('./structures/rels')
const { point, package: packageFn, transport } = require('./structures/transport')
const { auction } = require('./structures/auction')
const { bid } = require('./structures/bid')
const { filter, filters } = require('./structures/filter')
const { Request } = require('./structures/request')
const sfu = require('./structures/sfu')
const notification = require('./structures/notification')
const extractPackageAndStepInformation = require('./tools/auction/extractPackageAndStepInformation')
const { Message } = require('./structures/message')
const { notes } = require('./structures/notes')

exports.address = () => address

exports.contact = () => contact

exports.fleet = () => fleet

exports.vehicle = () => vehicle

exports.auctionContact = () => auctionContact

exports.rel = () => rel

exports.rels = () => rels

exports.point = () => point

exports.package = () => packageFn

exports.transport = () => transport

exports.auction = config => auction(config)

exports.bid = config => bid(config)

exports.filter = () => filter

exports.filters = () => filters

exports.sfu = () => sfu

exports.notification = () => notification

exports.Request = () => Request

exports.Message = () => Message

exports.notes = () => notes

exports.tools = {
    auction: {
        extractPackageAndStepInformation,
    },
};
