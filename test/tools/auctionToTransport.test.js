const auctionToTransport = require('../../tools/auctionToTransport')
const s = require('superstruct')
const { transport } = require('../../structures/sfu/transport')

describe('Auction to transport', () => {
    test.each([
        [
            {
                key: 'KEY1234567',
                name: 'KEY1234567',
                target: [
                    'TARGET'
                ],
                puPlace: [
                    'Somewhere',
                    '22222',
                    'City',
                    'France',
                    'FR',
                    'Europe/Paris'
                ],
                puDate: '2021-10-18T08:00:00Z',
                puLocation: '42.6366357,1.5273037',
                dePlace: [
                    "Somewhere",
                    '11111',
                    'City',
                    'France',
                    'FR',
                    'Europe/Paris'
                ],
                deLocation: '48.39,-1.288',
                deDate: '2021-10-18T15:00:00Z',
                stackable: 'No',
                currency: 'EUR',
                visible: 'public',
                distance: 614.248,
                transport: ['COLIS'],
                creator: 'CREATOR',
                vehicles: ['frg2'],
                puDateRange: '2021-10-18T08:00:00Z',
                deDateRange: '2021-10-18T16:00:00Z',
                dimension: ['4', '80', '120', '120', '88', 'No'],
                source: ['SOURCE'],
                options: ['PKG_V1'],
                reported_at: '2021-10-15T15:08:59.033Z',
                type: 'auction',
                id: 'fb53771d-c8c5-4f8a-a82b-4c46b63ce789',
                valid_until: '2021-10-16T15:09:00.394Z',
                valid_from: '2021-10-15T15:09:00.394Z',
                status: 'completed',
                sourceName: ['SOURCE'],
                targetStatus: [
                    ''
                ],
                targetName: [
                    'TEST'
                ],
                winningbid: '74937786-0283-49d7-81b9-d64afb3c472e',
                bestbidprice: 100,
                bestbid: '1188b0c4-53fd-4ce4-bff6-8917bafce2aa',
                targetOwner: [
                    ''
                ],
                puContact: [
                    '',
                    'Somebody',
                    'example@example.net',
                    '0000000000'
                ],
                deContact: ['Company', 'Someone', '', ''],
                bid: {
                    puDate: '2021-10-18T08:00:00Z',
                    deDate: '2021-10-18T15:00:00Z',
                    price: 100,
                    currency: 'EUR',
                    sourceComment: [''],
                    from: 'TEST',
                    creator: 'TEST',
                    source: ['TARGET'],
                    target: ['SOURCE'],
                    type: 'bid',
                    status: 'accepted',
                    valid_until: '2021-10-15T15:55:19Z',
                    loaded: 'No',
                    lang: 'F',
                    driver: 'someplate',
                    vehicule: 'FRG3',
                    tracker: 'ftk',
                    key: 'KEY1234567',
                    reported_at: '2021-10-15T15:10:14.426Z',
                    validatorEmails: ['example@example.net'],
                    id: '74937786-0283-49d7-81b9-d64afb3c472e',
                    targetRating: 0,
                    tms: 'TMS',
                    decision_maker: 'someone'
                }
            }
        ],
        [
            {
                key: 'KEY1234567',
                name: 'KEY1234567',
                target: [
                    'TARGET'
                ],
                puPlace: [
                    'Somewhere',
                    '22222',
                    'City',
                    'France',
                    'FR',
                    'Europe/Paris'
                ],
                puDate: '2021-10-18T08:00:00Z',
                puLocation: '42.6366357,1.5273037',
                dePlace: [
                    "Somewhere",
                    '11111',
                    'City',
                    'France',
                    'FR',
                    'Europe/Paris'
                ],
                deLocation: '48.39,-1.288',
                deDate: '2021-10-18T15:00:00Z',
                stackable: 'No',
                currency: 'EUR',
                visible: 'public',
                distance: 614.248,
                transport: ['COLIS'],
                creator: 'CREATOR',
                vehicles: ['frg2'],
                puDateRange: '2021-10-18T08:00:00Z',
                deDateRange: '2021-10-18T16:00:00Z',
                dimension: ['4', '80', '120', '120', '88', 'No'],
                source: ['SOURCE'],
                options: ['PKG_V1'],
                reported_at: '2021-10-15T15:08:59.033Z',
                type: 'auction',
                id: 'fb53771d-c8c5-4f8a-a82b-4c46b63ce789',
                valid_until: '2021-10-16T15:09:00.394Z',
                valid_from: '2021-10-15T15:09:00.394Z',
                status: 'completed',
                sourceName: ['SOURCE'],
                targetStatus: [
                    ''
                ],
                targetName: [
                    'TEST'
                ],
                winningbid: '74937786-0283-49d7-81b9-d64afb3c472e',
                bestbidprice: 100,
                bestbid: '1188b0c4-53fd-4ce4-bff6-8917bafce2aa',
                targetOwner: [
                    ''
                ],
                puContact: [
                    '',
                    '',
                    'example@example.net',
                    '0000000000'
                ],
                deContact: ['Company', 'Someone', '', ''],
                bid: {
                    puDate: '2021-10-18T08:00:00Z',
                    deDate: '2021-10-18T15:00:00Z',
                    price: 100,
                    currency: 'EUR',
                    sourceComment: [''],
                    from: 'TEST',
                    creator: 'TEST',
                    source: ['TARGET'],
                    target: ['SOURCE'],
                    type: 'bid',
                    status: 'accepted',
                    valid_until: '2021-10-15T15:55:19Z',
                    loaded: 'No',
                    lang: 'F',
                    driver: 'someplate',
                    vehicule: 'FRG3',
                    tracker: 'ftk',
                    key: 'KEY1234567',
                    reported_at: '2021-10-15T15:10:14.426Z',
                    validatorEmails: ['example@example.net'],
                    id: '74937786-0283-49d7-81b9-d64afb3c472e',
                    targetRating: 0,
                    tms: 'TMS',
                    decision_maker: 'someone'
                }
            }
        ],
        [

            {
                "target": ["85REU"],
                "key": "PURCHASE_generated-220209100209-1",
                "name": "PURCHASE_generated-220209100209-1",
                "valid_until": "2022-02-13T10:02:09Z",
                "deLocation": "49.19,6.89",
                "puLocation": "49.4748422,5.9388295",
                "puPlace": ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR"],
                "puDate": "2022-02-13T10:02:09Z",
                "puDateRange": "2022-02-13T11:02:09Z",
                "dePlace": ["8 rue bellevue", "57600", "forbach", "France", "FR"],
                "deDate": "2022-02-16T10:02:09Z",
                "deDateRange": "2022-02-16T11:02:09Z",
                "decision_from": "2022-02-13T06:02:09Z",
                "dimension": ["1", "100", "100", "100", "42", "", "yes", "", "", "", "A", "630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR", "49.4748422,5.9388295", "Europe/Paris", "Test 1", "Test 1", "test1@test.test", "300000000", "2022-02-13T10:02:09Z", "2022-02-13T11:02:09Z", "B", "8 rue bellevue", "57600", "forbach", "France", "FR", "49.19,6.89", "Europe/Paris", "Test 2", "Test 2", "test2@test.test", "300000002", "2022-02-16T10:02:09Z", "2022-02-16T11:02:09Z", "1", "50", "50", "50", "32", "", "yes", "", "", "", "a", "30 rue des romains", "57970", "yutz", "France", "FR", "49.35,6.18", "Europe/Paris", "Test 1", "Test 1", "test1@test.test", "300000000", "2022-02-14T10:02:09Z", "2022-02-14T11:02:09Z", "B", "8 rue bellevue", "57600", "forbach", "France", "FR", "49.19,6.89", "Europe/Paris", "Test 2", "Test 2", "test2@test.test", "300000002", "2022-02-16T10:02:09Z", "2022-02-16T11:02:09Z"],
                "visible": "private",
                "id": "8b368042-6da6-4ab6-9b57-7aec0f03f4ed",
                "options": ["MULTISTEP"],
                "reported_at": "2022-02-09T10:02:09Z",
                "valid_from": "2022-02-09T10:02:09Z",
                "type": "auction",
                "status": "created",
                "currency": "EUR",
                "source": ["FROPSCENTER"],
                "incoterm": "FCA",
                "distance": 437,
                "sourceName": "French Operations Center",
                "vehicles": ["frg3"],
                "targetStatus": [""],
                "targetName": ["Gaetan Services"],
                "creator": "FLASH_AGENCY",
                "extras": ["DRIVERS-TWO"],
                "winningbid": "",
                bid: {
                    puDate: '2021-10-18T08:00:00Z',
                    deDate: '2021-10-18T15:00:00Z',
                    price: 100,
                    currency: 'EUR',
                    sourceComment: [''],
                    from: 'TEST',
                    creator: 'TEST',
                    source: ['TARGET'],
                    target: ['SOURCE'],
                    type: 'bid',
                    status: 'accepted',
                    valid_until: '2021-10-15T15:55:19Z',
                    loaded: 'No',
                    lang: 'F',
                    driver: 'someplate',
                    vehicule: 'FRG3',
                    tracker: 'ftk',
                    key: 'KEY1234567',
                    reported_at: '2021-10-15T15:10:14.426Z',
                    validatorEmails: ['example@example.net'],
                    id: '74937786-0283-49d7-81b9-d64afb3c472e',
                    targetRating: 0,
                    tms: 'TMS',
                    decision_maker: 'someone'
                }
            }
        ]
    ])('Auction is transformed to Transport', (auction) => {
        expect(s.is(auctionToTransport(auction), transport)).toBeTruthy()
    })
})
