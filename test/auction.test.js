const s = require('superstruct')
const AuctionStruct = require('../structures/auction').auction()

const Auctions = [{
  id: require('uuid').v4(),
  valid_from: new Date().toISOString(),
  valid_until: new Date(new Date().getTime() + 300000).toISOString(),
  key: "jest-" + Math.round((new Date()).getTime()),
  source: ["DEMO"],
  target: ["DEMOEX"],
  options: ['MULTISTEP'],
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

const auction = {
  puPlace: ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR"],
  puDate: new Date(new Date().setDate((new Date().getDate() + 1))).toISOString(),
  dePlace: ["8 rue de surene", "75008", "Paris", "France", "FR"],
  deDate: new Date(new Date().setDate((new Date().getDate() + 2))).toISOString(),
  dimension: ["1", "100", "120", "120", "5", "no"]
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
  let AuctionF1 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF1.puContact = ["Doom Center", "Laurent", "lav@yoctu.com", "toto"]
  test('Failed: Phone Auction structure', () => {
    const [err1, val1] = s.validate(AuctionF1, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err1).toBeDefined()
    expect(err1).toHaveProperty('type','string')
    expect(val1).toBeUndefined()
  })
  let AuctionF2 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF2.puContact = ["Doom Center", "Laurent", "NA", "0011111111"]
  test('Failed: Email Auction structure', () => {
    const [err2, val2] = s.validate(AuctionF2, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err2).toBeDefined()
    expect(err2).toHaveProperty('type','Email')
    expect(val2).toBeUndefined()
  })
  let AuctionF3 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF3.puPlace= ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR", "Europe/Paris"],
  test('Succes: PuPlace timezone string Auction structure', () => {
    const [err3, val3] = s.validate(AuctionF3, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err3).toBeUndefined()
  })
  let AuctionF4 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF4.puPlace= ["630 rue salvadore allende", "57390", "audin-le-tiche", "France", "FR", "My/Country"],
  test('Failed: PuPlace unknown timezone string Auction structure', () => {
    const [err4, val4] = s.validate(AuctionF4, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err4).toBeDefined()
    expect(err4).toHaveProperty('type','Tz')
  })
  let AuctionF5 = JSON.parse(JSON.stringify(Auctions[0]))
  AuctionF5.targetOwner = ["ftaggart"]
  AuctionF5.sourceOwner = ["llaffer"]
  test('Success: target and source Owner Auction structure', () => {
    const [err5, val5] = s.validate(AuctionF5, AuctionStruct, {
      coerce: true, mask: true
    })
    expect(err5).toBeUndefined()
    expect(val5).toHaveProperty('targetOwner',['ftaggart'])
    expect(val5).toHaveProperty('sourceOwner',['llaffer'])
  })
})
