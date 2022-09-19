const s = require('superstruct')

const auctionStruct = require('../../structures/auction').auction()
const requestToAuction = require('../../tools/requestToAuction')
const request = require('./entities/request')
const auction = require('./entities/auction')

describe('request to auction tool', () => {
    test('validate minimum data', () => {
        const r = requestToAuction(request)

        expect(r.key).toStrictEqual(auction.key)
        expect(r.name).toStrictEqual(auction.key)
        expect(r.creator).toStrictEqual(auction.creator)
        expect(r.source).toStrictEqual(auction.source)
        expect(r.distance).toStrictEqual(auction.distance)
        expect(r.options).toStrictEqual(auction.options)
        expect(r.puPlace).toStrictEqual(auction.puPlace)
        expect(r.dePlace).toStrictEqual(auction.dePlace)
        expect(r.puContact).toStrictEqual(auction.puContact)
        expect(r.deContact).toStrictEqual(auction.deContact)
        expect(r.puDate).toStrictEqual(auction.puDate)
        expect(r.deDate).toStrictEqual(auction.deDate)
        expect(r.puDateRange).toStrictEqual(auction.puDateRange)
        expect(r.deDateRange).toStrictEqual(auction.deDateRange)
        expect(r.puLocation).toStrictEqual(auction.puLocation)
        expect(r.deLocation).toStrictEqual(auction.deLocation)
        expect(r.dimension).toStrictEqual(auction.dimension)
    })

    test('validate auction struct', () => {
        const r = requestToAuction(request)
        const [err, val] = s.validate(r, auctionStruct, {
            coerce: true, mask: true
        })

        expect(err).toBeUndefined()
        expect(val).toBeDefined()
    })
})
