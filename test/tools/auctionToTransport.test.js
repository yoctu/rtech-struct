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
          'FR',
          'FR',
          'Europe/Paris'
        ],
        puDate: '2021-10-18T08:00:00Z',
        puLocation: '42.6366357,1.5273037',
        dePlace: [
          "Somewhere",
          '11111',
          'City',
          'FR',
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
    ]
  ])('Auction is transformed to Transport', (auction) => {
    expect(s.is(auctionToTransport(auction), transport)).toBeTruthy()
  })
})
