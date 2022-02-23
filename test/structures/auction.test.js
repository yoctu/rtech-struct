const s = require('superstruct')
const AuctionStruct = require('../../structures/auction').auction()

const Auctions = [{
  id: require('uuid').v4(),
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
},
{
  id: require('uuid').v4(),
  valid_from: new Date().toISOString(),
  valid_until: new Date(new Date().getTime() + 300000).toISOString(),
  key: "jest-" + Math.round((new Date()).getTime()),
  source: ["DEMO"],
  target: ["DEMOEX"],
  options: ["MULTISTEP"],
  puPlace: ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR"],
  puLocation: "49.4748422,5.9388295",
  puContact: ["Doom Center", "Laurent", "lav@yoctu.com", "+333333333"],
  puDate: new Date(new Date().setDate((new Date().getDate() + 1))).toISOString(),
  dePlace: ["8 rue de surene", "75008", "Paris", "France", "FR"],
  deLocation: ["48.8707626", "2.319565"],
  deContact: ["Sara home", "Bertrand", "bertrand@yoctu.com", "00333333333"],
  deDate: new Date(new Date().setDate((new Date().getDate() + 2))).toISOString(),
  dimension: ["2", "100", "100", "10", "", "no", "", "", "0",
    "EG2103CF36-A", "35 RUE DE CALAIS", "67100", "STRASBOURG", "France", "FR", "48.5252,7.7824", "Europe/Paris", "test1", "test1", "test1@test.fr", "090809080908", "2021-03-01T01:00:00", "2021-03-01T01:00:00",
    "EG2103CF36-B", "14 RUE GORGE DE LOUP", "69009", "LYON", "France", "FR", "45.77,4.8041", "Europe/Paris", "test2", "test2", "test2@test.fr", "090809080908", "2021-03-01T01:00:00", "2021-03-01T01:00:00"
  ],
  vehicles: ["van1"],
  distance: "500",
  notes: "Nothing",
  stackable: "No",
  transport: ["AIR", "CAR"],
  currency: "EUR",
  visible: "public"
}]

const auction = {
  puPlace: ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR"],
  puDate: new Date(new Date().setDate((new Date().getDate() + 1))).toISOString(),
  dePlace: ["8 rue de surene", "75008", "Paris", "France", "FR"],
  deDate: new Date(new Date().setDate((new Date().getDate() + 2))).toISOString(),
  dimension: ["1", "100", "120", "120", "5", "no"],
  extras: ['2ND_DRIVER']
}

describe('Auction object structure', () => {
  test('Success: Auction structure', () => {
    const [err0, val0] = s.validate(auction, AuctionStruct, {
      coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
    for (const i of ['id', 'name', 'key']) {
      expect(val0).toHaveProperty(i)
    }
    expect(val0.puPlace).toEqual(["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR"])
  })
  test('Success: Default Auction structure', () => {
    const [err0, val0] = s.validate(Auctions[0], AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })
  test('Success: Default Multistep auction structure', () => {
    const [err0, val0] = s.validate(Auctions[1], AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })
  let AuctionF1 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF1.puContact = ["Doom Center", "Laurent", "lav@yoctu.com", "toto"]
  test('Failed: Phone Auction structure', () => {
    const [err1, val1] = s.validate(AuctionF1, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err1).toBeDefined()
    expect(err1).toHaveProperty('type', 'string')
    expect(val1).toBeUndefined()
  })
  let AuctionF2 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF2.puContact = ["Doom Center", "Laurent", "NA", "0011111111"]
  test('Failed: Email Auction structure', () => {
    const [err2, val2] = s.validate(AuctionF2, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err2).toBeDefined()
    expect(err2).toHaveProperty('type', 'Email')
    expect(val2).toBeUndefined()
  })
  let AuctionF3 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF3.puPlace = ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR", "Europe/Paris"],
    test('Succes: PuPlace timezone string Auction structure', () => {
      const [err3, val3] = s.validate(AuctionF3, AuctionStruct, {
        coerce: true, mask: true
      })
      expect(err3).toBeUndefined()
    })
  let AuctionF4 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF4.puPlace = ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR", "My/Country"],
    test('Failed: PuPlace unknown timezone string Auction structure', () => {
      const [err4, val4] = s.validate(AuctionF4, AuctionStruct, {
        coerce: true, mask: true
      })
      expect(err4).toBeDefined()
      expect(err4).toHaveProperty('type', 'Tz')
    })
  let AuctionF5 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF5.targetOwner = ["ftaggart"]
  AuctionF5.sourceOwner = ["llaffer"]
  test('Success: target and source Owner Auction structure', () => {
    const [err5, val5] = s.validate(AuctionF5, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err5).toBeUndefined()
    expect(val5).toHaveProperty('targetOwner', ['ftaggart'])
    expect(val5).toHaveProperty('sourceOwner', ['llaffer'])
  })
  let AuctionF6 = JSON.parse(JSON.stringify(Auctions[0]))
  delete AuctionF6.puPlace
  test('Failed: missing puPlace auction structure', () => {
    const [err6, val6] = s.validate(AuctionF6, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err6).toBeDefined()
    expect(err6).toHaveProperty('key', 'puPlace')
  })

  let AuctionF7 = JSON.parse(JSON.stringify(Auctions[0]))
  test('Success: Auction with empty extra structure', () => {
    const [err2, val2] = s.validate(AuctionF7, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err2).toBeUndefined()
    expect(val2).toHaveProperty('extras')
  })

  let AuctionF8 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF8.extras = ['2ND_DRIVER', 'OTHER_EXTRA']
  test('Success: Auction extra structure', () => {
    const [err2, val2] = s.validate(AuctionF8, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err2).toBeUndefined()
    expect(val2).toBeDefined()
    expect(val2).toHaveProperty('extras', ['2ND_DRIVER', 'OTHER_EXTRA'])
  })

  let AuctionF9 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF9.reported_at = '2022-01-10T13:28:38.566Z'
  test('Success: Auction decision_from structure', () => {
    const [err9, val9] = s.validate(AuctionF9, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err9).toBeUndefined()
    expect(val9).toBeDefined()
    expect(val9).toHaveProperty('decision_from')
    expect(val9.decision_from).toBeDefined()
    expect(val9.decision_from).toEqual(val9.reported_at)
  })

  const AuctionF10 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF10.deDate = '2022-02-30T09:05:01.123Z'
  test('Failed: deDate does not exist (30th Feb 22)', () => {
    const [error, entity] = s.validate(AuctionF10, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(error).toBeDefined()
    expect(error).toHaveProperty('key', 'deDate')
  })
})
