const s = require('superstruct')
const struct = require('../../../structures/transport/v2/vehicle')

describe('Vehicle object structure', () => {
  test('Success: vehicle structure', () => {
    expect(s.is({
      tracking_provider: 'tracking',
      plate: 'AB 123 CD',
      information: 'blabla',
      type: 'transport',
      brand: 'Volvo',
      carrier: {
        code: 'CARRIER'
      },
      drivers:[
        {
          phone: '+352 42 42 42',
          name: 'Driver name'
        }
      ],
      packages: ['17504abf-40ea-4b20-86dd-eb6ff00af325']
    }, struct.vehicle)).toBeTruthy()
  })
})
