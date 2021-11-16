const s = require('superstruct')
const { vehiclePosition } = require('../../../structures/sfu/vehiclePosition')

describe('vehiclePosition object structure', () => {
  test('Success: vehicle position', () => {
    const [error, entity] = s.validate({
      data: {
        lat: 49.221935,
        lon: 6.217841
      }
    }, vehiclePosition)

    expect(error).toBeUndefined()
  });
})
