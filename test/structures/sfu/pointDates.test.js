const s = require('superstruct')
const { arrivalAt, departureAt } = require('../../../structures/sfu/pointDates')

describe('pointDates object structure', () => {
  test('Success: arrival at', () => {
    const [error, entity] = s.validate({
      arrival_at: '2021-11-11T20:00:00Z'
    }, arrivalAt, { coerce: true })

    expect(error).toBeUndefined()
  });
  test('Failure: arrival at ISO', () => {
    const [error, entity] = s.validate({
      arrival_at: new Date().toISOString()
    }, arrivalAt, { coerce: true })

    expect(error).not.toBeNull()
  });
  test('Failure: arrival at UTC', () => {
    const [error, entity] = s.validate({
      arrival_at: new Date().toUTCString()
    }, arrivalAt, { coerce: true })

    expect(error).not.toBeNull()
  });

  test('Success: departure at', () => {
    const [error, entity] = s.validate({
      departure_at: '2021-11-11T20:00:00Z'
    }, departureAt, { coerce: true })

    expect(error).toBeUndefined()
  });
  test('Failure: departure at ISO', () => {
    const [error, entity] = s.validate({
      departure_at: new Date().toISOString()
    }, departureAt, { coerce: true })

    expect(error).not.toBeNull()
  });
  test('Failure: departure at UTC', () => {
    const [error, entity] = s.validate({
      departure_at: new Date().toUTCString()
    }, departureAt, { coerce: true })

    expect(error).not.toBeNull()
  });
})
