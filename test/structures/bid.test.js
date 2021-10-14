const s = require('superstruct')

const Config = {
  shaq: {
    rating : 3
  },
  app: {
    validatoremail: "shaq@yoctu.com",
    logourl: "https://yoctu.github.io/shaq-view/img/"
  }
}

const Auctions = [{
  id: require('uuid').v4(),
  creator: 'DEMO',
  valid_from: new Date().toISOString(),
  valid_until: new Date(new Date().getTime() + 300000).toISOString(),
  key: "jest-" + Math.round((new Date()).getTime()),
  source: ["DEMO"],
  target: ["DEMOEX"],
  puPlace: ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR"],
  puLocation: "49.4748422,5.9388295",
  puContact: ["Doom Center", "Laurent", "lav@yoctu.com", "+333333333"],
  puDate: new Date(new Date().setDate((new Date().getDate() + 1))).toISOString(),
  dePlace: ["8 rue de surene", "75008", "Paris", "France", "FR"],
  deLocation: ["48.8707626", "2.319565"],
  deContact: ["Sara home", "Bertrand", "bertrand@yoctu.com", "00333333333"],
  deDate: new Date(new Date().setDate((new Date().getDate() + 2))).toISOString(),
  dimension: ["1", "100", "120", "120", "5", "no"],
  vehicles: ["van1"],
  distance: "500",
  notes: "Nothing",
  stackable: "No",
  transport: ["AIR", "CAR"],
  currency: "EUR",
  visible: "public"
}]

const BidStruct = require('../../structures/bid').bid()
const BidStructAuction = require('../../structures/bid').bid(null, Auctions[0])
const BidStructConfigScoreStrings = require('../../structures/bid').bid({...Config, ...{score: [ "1", "5", "2" ]}}, null)
const BidStructConfigScoreNumbers = require('../../structures/bid').bid({...Config, ...{score: [ 1, 15, 6 ]}}, null)
const BidStructAuctionConfig = require('../../structures/bid').bid(Config, Auctions[0])

const Bids = [{
  key: 'jest-bid-test',
  target: ['DEMO'],
  price: '30',
  driver: '1803LV90'
}]

describe('Bid object structure', () => {

  test('Success: Bid structure', () => {
    const [err0, val0] = s.validate(Bids[0], BidStruct, {
	    coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with No as loaded', () => {
    let payload = JSON.parse(JSON.stringify(Bids[0]));
    payload.loaded = "No";
    const [err0, val0] = s.validate(payload, BidStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with Yes as loaded', () => {
    let payload = JSON.parse(JSON.stringify(Bids[0]));
    payload.loaded = "Yes";
    const [err0, val0] = s.validate(payload, BidStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with loaded has invalid value', () => {
    let payload = JSON.parse(JSON.stringify(Bids[0]));
    payload.loaded = false;
    const [err0, val0] = s.validate(payload, BidStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeDefined()
    expect(val0).toBeUndefined()
  })

  test('Success: Bid structure with Auction', () => {
    const [err0, val0] = s.validate(Bids[0], BidStructAuction, {
	    coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with BidStructConfigScoreStrings', () => {

    const [err0, val0] = s.validate(Bids[0], BidStructConfigScoreStrings, {
	    coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with BidStructConfigScoreNumbers', () => {

    const [err0, val0] = s.validate(Bids[0], BidStructConfigScoreNumbers, {
      coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with Config and Auction', () => {
    const [err0, val0] = s.validate(Bids[0], BidStructAuctionConfig, {
	    coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with puPlace with no values', () => {
    let payload = JSON.parse(JSON.stringify(Bids[0]));
    payload.puPlace = ['', '', '', '', 'FR'];
    const [err0, val0] = s.validate(payload, BidStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with dePlace with no values', () => {
    let payload = JSON.parse(JSON.stringify(Bids[0]));
    payload.dePlace = ['', '', '', '', 'FR'];
    const [err0, val0] = s.validate(payload, BidStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Success: Bid structure with logo as a path', () => {
    let payload = JSON.parse(JSON.stringify(Bids[0]));
    payload.logo = '/assets/img/flash_logo.png';
    const [err0, val0] = s.validate(payload, BidStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })
})
