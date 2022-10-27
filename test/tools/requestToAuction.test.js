const s = require('superstruct')

const auctionStruct = require('../../structures/auction').auction()
const requestToAuction = require('../../tools/requestToAuction')
const request = require('./entities/request')
const auction = require('./entities/auction')

describe('request to auction tool', () => {
    test('validate minimum data', () => {
        const r = requestToAuction(request, {
            company_name: 'John',
            name: 'Doe',
            email: 'todoemail@mail.fr',
            phone: '+333333333',
        })

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
        const r = requestToAuction(request, {
            company_name: 'John',
            name: 'Doe',
            email: 'todoemail@mail.fr',
            phone: '+333333333',
        })
        const [err, val] = s.validate(r, auctionStruct, {
            coerce: true, mask: true
        })

        expect(err).toBeUndefined()
        expect(val).toBeDefined()
    })

    test('validate auction struct with PKG_V2', () => {
        const copyRequest = request

        copyRequest.points = [
            {
                "key": "A",
                "arrival_from": "2022-09-15T16:30:00.000Z",
                "arrival_until": "2022-09-15T20:30:00.000Z",
                "address": {
                    "city": "Nancy",
                    "country": "FR",
                    "zip_code": "54000",
                    "timezone_string": "Europe/Paris",
                    "street": "31 rue de la colline",
                    "position": {
                        "lat": 48.6987,
                        "lon": 6.1597
                    }
                },
                "contact": {
                    "name": "Flynn",
                    "company_name": "test comma",
                    "phone": "+330102030405",
                    "email": "test@test.com"
                },
                "package_to_load": [
                    "c520bb79-77e6-4b0a-81f9-38dd041378e9"
                ],
                "package_to_unload": []
            },
            {
                "key": "B",
                "arrival_from": "2022-09-16T12:45:00.000Z",
                "arrival_until": "2022-09-16T16:45:00.000Z",
                "address": {
                    "city": "Nantes",
                    "country": "FR",
                    "zip_code": "44000",
                    "timezone_string": "Europe/Paris",
                    "street": "10 Rue de Strasbourg",
                    "position": {
                        "lat": 47.216,
                        "lon": -1.551
                    }
                },
                "contact": {
                    "name": "4353425435",
                    "phone": "+352234234"
                },
                "package_to_load": [],
                "package_to_unload": [
                    "4085a92f-bedc-4065-a2f0-6350f8eeb3d2"
                ]
            }
        ]

        const r = requestToAuction(copyRequest, {
            company_name: 'John',
            name: 'Doe',
            email: 'todoemail@mail.fr',
            phone: '+333333333',
        })
        const [err, val] = s.validate(r, auctionStruct, {
            coerce: true, mask: true
        })

        expect(err).toBeUndefined()
        expect(val).toBeDefined()
    })
})
