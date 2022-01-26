const s = require('superstruct')
const { Request } = require('../../structures/request')
const request = {
    source: [
        '82SKOREWAY2'
    ],
    points: [
        {
            key: 'A',
            arrival_from: '2021-05-06T07:00:00Z',
            arrival_until: '2021-05-06T07:00:00Z',
            address: {
                street: 'UL. NOWATOROW 20',
                city: 'GDANSK',
                zip_code: '80-298',
                country: 'PL',
                position: {
                    lat: 54.3723,
                    lon: 18.4749
                },
                timezone_string: 'Europe/Warsaw'
            },
            contact: {
                company_name: 'APTIV SERVICES POLAND SA'
            },
            package_to_load: [
                '5b48e3f3-47b5-4c1a-9d32-de3bdf4c142d'
            ],
            package_to_unload: []
        },
        {
            key: 'a',
            arrival_from: '2021-05-06T15:15:00Z',
            arrival_until: '2021-05-06T15:15:00Z',
            address: {
                street: 'UL. WOJKOWICKA 14A',
                city: 'CZELADZ',
                zip_code: '41-250',
                country: 'PL',
                position: {
                    lat: 50.3179,
                    lon: 19.0755
                },
                timezone_string: 'Europe/Warsaw'
            },
            contact: {
                company_name: 'SFA'
            },
            package_to_load: [
                '3d07ac5c-0962-453b-ac57-cfbad3b704b3'
            ],
            package_to_unload: []
        },
        {
            key: 'b',
            arrival_from: '2021-05-06T19:00:00Z',
            arrival_until: '2021-05-06T19:00:00Z',
            address: {
                street: 'UL ROZDZIENSKIEGO 12',
                city: 'DABROWA GORNICZA',
                zip_code: '41-303',
                country: 'PL',
                position: {
                    lat: 50.3242,
                    lon: 19.1902
                },
                timezone_string: 'Europe/Warsaw'
            },
            contact: {
                company_name: 'MAGNA AUTOMOTIVE (POLAND) SPZOO'
            },
            package_to_load: [
                '6ba65779-5d10-4f2e-96b2-3756659b3b0f'
            ],
            package_to_unload: []
        },
        {
            key: 'B',
            arrival_from: '2021-05-07T06:00:00Z',
            arrival_until: '2021-05-07T06:00:00Z',
            address: {
                street: 'ulica Adama Opla, 1',
                city: 'Gliwice',
                zip_code: '44-121',
                country: 'PL',
                position: {
                    lat: 50.319,
                    lon: 18.6217
                },
                timezone_string: 'Europe/Warsaw'
            },
            contact: {
                company_name: 'GM Manufacturing Poland'
            },
            package_to_load: [],
            package_to_unload: [
                '5b48e3f3-47b5-4c1a-9d32-de3bdf4c142d',
                '3d07ac5c-0962-453b-ac57-cfbad3b704b3',
                '6ba65779-5d10-4f2e-96b2-3756659b3b0f'
            ]
        }
    ],
    packages: [
        {
            owner: '82SKOREWAY2',
            height: 98,
            length: 100,
            width: 60,
            weight: 53,
            stackable: 'no',
            quantity: 2,
            package_type: 'parcel',
            references: [
                'POS213899',
                '39158162 - 240pcs'
            ],
            tracking_id: '5b48e3f3-47b5-4c1a-9d32-de3bdf4c142d'
        },
        {
            owner: '82SKOREWAY2',
            height: 15,
            length: 30,
            width: 20,
            weight: 14,
            stackable: 'no',
            quantity: 1,
            package_type: 'parcel',
            references: [
                'POS213900',
                '39217187 - 300pcs'
            ],
            tracking_id: '3d07ac5c-0962-453b-ac57-cfbad3b704b3'
        },
        {
            owner: '82SKOREWAY2',
            height: 100,
            length: 120,
            width: 100,
            weight: 350,
            stackable: 'no',
            quantity: 2,
            package_type: 'parcel',
            references: [
                'POS213901',
                '13533588 - 30pcs / 13533667 - 300pcs'
            ],
            tracking_id: '6ba65779-5d10-4f2e-96b2-3756659b3b0f'
        }
    ],
    transports: [
        {
            way: ['A', 'a', 'b', 'B'],
            vehicles: ['FRG2'],
            distances: [382.871, 100.001]
        }
    ]
}

describe('Request object structure', () => {
    test('Request structure', () => {
        expect(s.is(request, Request)).toBeTruthy()
    })

    test('Request with extras', () => {
        request.extras = ['SECOND_DRIVER', 'OTHER_EXTRA']
        expect(s.is(request, Request)).toBeTruthy()
    })

    test('Request default extras', () => {
        delete request.extras

        const [error, data] = s.validate(request, Request, { coerce: true })

        expect(error).toBeUndefined()
        expect(data).toHaveProperty('extras', [])
    })

    test('Request with invoice', () => {
        request.invoice = {
            'bill_to': '82SKOREWAY2',
            'currency': 'EUR'
        }
        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request with custom fields', () => {
        request.custom_fields = [
            {
                'label': 'My Field',
                'value': 'Field value'
            }
        ]
        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request with references', () => {
        request.references=[
            {
                'label': 'Reference One',
                'value': 'Field value'
            }
        ]

        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request with order_type getitnow', () => {
        request.order_type=
            {
                'type': 'getitnow',
                'amount': 500
            }


        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request with validity_time', () => {
        request.validity_time = {
            'valid_from':'2021-05-06T15:15:00Z',
            'valid_until':'2021-05-06T15:15:00+0200',
        }

        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request with validity_time and decision_time and defaulted close_after', () => {
        request.validity_time = {
            'valid_from':'2021-05-06T15:15:00Z',
            'valid_until':'2021-05-06T15:15:00+0200',
        }
        request.validity_time.decision_time = {
            'decision_from': '2021-05-06T15:15:00Z',
        }

        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request with validity_time and decision_time and setted close_after', () => {
        request.validity_time = {
            'valid_from':'2021-05-06T15:15:00Z',
            'valid_until':'2021-05-06T15:15:00+0200',
        }
        request.validity_time.decision_time = {
            'decision_from': '2021-05-06T15:15:00Z',
            'close_after': true,
        }

        const [error] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request target not empty', () => {
        request.creator = 'E4P'
        request.target= ['ATS', 'INTIME']

        const [error, data] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request have comment', () => {
        request.comment = 'A simple comment'

        const [error, data] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()

        expect(data).toHaveProperty('comment', 'A simple comment')
    })

    test('Request have customer_interlocutor', () => {
        request.customer_interlocutor = {
            email: 'jdoe@flash-global.net'
        }

        const [error, data] = s.validate(request, Request, { coerce: true })
        expect(error).toBeUndefined()
    })

    test('Request have requester valid', () => {
        request.call_in_contact = {
            name: 'Doe',
            firstname: 'Jhon',
            email: 'jdoe@flash-global.net'
        }
        expect(s.is(request, Request)).toBeTruthy()
    })

    test('Request have requester valid with phone', () => {
        request.call_in_contact = {
            name: 'Doe',
            firstname: 'Jhon',
            phone: '+3522020202020',
            email: 'jdoe@flash-global.net'
        }
        expect(s.is(request, Request)).toBeTruthy()
    })


    test('Request have requester invalid', () => {
        request.call_in_contact = {
            name: 'Doe',
            email: 'jdoe@flash-global.net'
        }
        expect(s.is(request, Request)).toBeFalsy()
    })
})
