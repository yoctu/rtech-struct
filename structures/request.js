const s = require('superstruct')
const { NoEmptyString } = require('./string')
const { Package } = require('./package')
const { PartialPoint } = require('./partial_point')
const { RequestedTransport } = require('./requested_transport')
const { CustomField } = require('./custom_field')
const { Invoice } = require('./invoice')
const { Reference } = require('./reference')
const { OrderType } = require('./order_type')
const { GetItNow } = require('./get_it_now')
const { ValidityTime } = require('./validity_time')
const { CustomerInterlocutor } = require('./customer_interlocutor')

const Request = s.object({
    key: s.optional(NoEmptyString),
    source: s.size(s.array(NoEmptyString), 1),
    packages: s.size(s.array(Package), 0, 50),
    points: s.size(s.array(PartialPoint), 2, 20),
    transports: s.size(s.array(RequestedTransport), 1, 10),
    extras: s.defaulted(s.optional(s.size(s.array(NoEmptyString), 0, 50)), []),
    references: s.optional(s.size(s.array(Reference), 0, 5)),
    customer_interlocutor: s.optional(CustomerInterlocutor),
    custom_fields: s.optional(s.size(s.array(CustomField), 0, 30)),
    invoice: s.optional(Invoice),
    order_type:s.optional(s.union([OrderType, GetItNow])),
    validity_time: s.optional(ValidityTime),
    issuer: s.optional(NoEmptyString),
    creator: s.optional(NoEmptyString),
    target: s.optional(s.size(s.array(NoEmptyString), 0, 100)),
    comment: s.optional(s.size(s.string(), 2, 512))
})

module.exports = {
    Request: Request
}
