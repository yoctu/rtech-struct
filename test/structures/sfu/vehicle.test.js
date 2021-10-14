const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().vehicle

describe('Vehicle object structure', () => {
  test('Success: vehicle structure', () => {
    expect(s.is({
      tracking_provider: 'tracking',
      plate: 'AB 123 CD',
      information: 'blabla',
      vehicle_type: 'transport',
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
  });

  test('Fail: wrong type', () => {
    const [error1] = s.validate({
      tracking_provider: 'tracking',
      plate: 'AB 123 CD',
      information: 'blabla',
      vehicle_type: 'transport',
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
      packages: ['17504abf-40ea-4b20-86dd-eb6ff00af325'],
      type: 'wrong type'
    }, struct.vehicle)

    expect(error1).toBeInstanceOf(s.StructError)
    expect(error1.path[0]).toBe('type')
  });

  test('Success: Point structure type is defaulted to point', () => {
    const [error, entity] = s.validate({
      tracking_provider: 'tracking',
      plate: 'AB 123 CD',
      information: 'blabla',
      vehicle_type: 'transport',
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
    }, struct.vehicle, { coerce: true })

    expect(error).toBeUndefined()
    expect(entity.type).toBe('vehicle')
  });
})
