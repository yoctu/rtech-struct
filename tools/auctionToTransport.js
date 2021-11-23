const uuid = require('uuid')
const { format } = require('date-fns-tz')
const extractPackageAndStepInformation = require('./auction/extractPackageAndStepInformation')

const isRubiwinPurchaseBid = (bid) => bid.creator === 'RUBIWIN' && bid.key.startsWith('PURCHASE_');

const auctionToTransport = (auction) => {
  let distance = 0

  const transport = {
    id: uuid.v4(),
    key: auction.key,
    status: 'planned',
    source: auction.source[0],
    creator: auction.creator,
    distances: [],
    vehicles: [],
    points: [],
    packages: []
  }

  if (!!auction.incoterm) {
    transport.incoterm = auction.incoterm
  }

  if (!!auction.waybills) {
    transport.waybill = auction.waybills
  }

  if (!!auction.tracking_url) {
    transport.tracking_url = auction.tracking_url
  }

  if (!!auction.distance) {
    distance = auction.distance
  }

  const { packages, steps } = extractPackageAndStepInformation(auction)

  transport.distances = Array.from({ length: steps.length - 1 }).map(!!distance ? () => distance / steps.length : () => 0)

  transport.packages = packages.map((pck) => {
    let stackable = pck.stackable.toLowerCase()

    if (stackable === 'yes') {
      stackable = '4'
    }

    const result = {
      puID: pck.puID,
      deID: pck.deID,
      quantity: pck.quantity,
      length: pck.length,
      width: pck.width,
      height: pck.height,
      weight: pck.weight,
      stackable: stackable,
      status: 'waiting_for_pickup',
      tracking_id: uuid.v4(),
      owner: auction.source[0],
      package_type: 'parcel'
    }

    if (!!pck.adr) {
      result.adr = pck.adr
    }

    if (!!pck.goodValue) {
      result.good_value = pck.goodValue
    }

    return result
  })

  transport.points = steps.map((step, index) => {
    const result = {
      key: step.key,
      packages_to_load: transport.packages.filter((pck) => pck.puID === step.id).map((pck) => pck.tracking_id),
      packages_to_unload: transport.packages.filter((pck) => pck.deID === step.id).map((pck) => pck.tracking_id),
      point_types: index === 0 ? ['PU'] : (index + 1 === steps.length ? ['DE'] : ['PU', 'DE']),
      address: {
        street: step.address.street,
        zip_code: step.address.zipcode,
        city: step.address.city,
        country: step.address.country
      }
    }

    if (!!step.address.timezone) {
      result.address.timezone_string = step.address.timezone
      result.arrival_from = format(new Date(step.date.replace('Z', '')), 'yyyy-MM-dd\'T\'HH:mm:ssxxx', { timeZone: step.address.timezone })
    } else {
      result.arrival_from = (new Date(step.date)).toISOString()
    }

    if (!!step.dateUntil) {
      if (!!step.address.timezone) {
        result.arrival_until = format(new Date(step.dateUntil.replace('Z', '')), 'yyyy-MM-dd\'T\'HH:mm:ssxxx', { timeZone: step.address.timezone })
      } else {
        result.arrival_until = (new Date(step.dateUntil)).toISOString()
      }
    }

    if (!!step.address.location) {
      const parts = step.address.location.split(',')

      result.address.position = {
        lat: Number.parseFloat(parts[0]),
        lon: Number.parseFloat(parts[1])
      }
    }

    if (!!step.contact) {
      const contact = {}

      if (!!step.contact.companyName) {
        contact.company_name = step.contact.companyName
      }

      if (!!step.contact.name) {
        contact.name = step.contact.name
      }

      if (!!step.contact.email) {
        contact.email = step.contact.email
      }

      if (!!step.contact.phone) {
        contact.phone = step.contact.phone
      }

      if (Object.keys(contact).length > 0) {
        result.contact = contact
      }
    }

    return result
  })

  if (!!auction.bid) {
    transport.vehicles = [{
      carrier: {
        code: isRubiwinPurchaseBid(auction.bid) ? auction.bid.from: auction.bid.source[0]
      },
      drivers: [],
      plate: auction.bid.driver,
      tracking_provider: auction.bid.tracker || 'ugo',
      vehicle_type: auction.bid.vehicule,
      packages: transport.packages.map((pck) => pck.tracking_id)
    }]
  }

  transport.packages.forEach((pck) => {
    delete pck.puID
    delete pck.deID
  })

  return transport
}

module.exports = auctionToTransport
