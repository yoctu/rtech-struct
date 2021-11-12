const s = require('superstruct')
const uuid = require('uuid')
const { sfu } = require('../../../index')

const struct = sfu().event

describe('Event structure test', () => {
  test('Success with minimal data', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO'
    }, struct.event)).toBeTruthy()
  })

  test('Success with maximal data', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      type: 'sfu/event',
      id: uuid.v4(),
      created_at: (new Date()).toISOString(),
      source: 'DEMO'
    }, struct.event)).toBeTruthy()
  })

  test('Success with minimal data - complete missing values', () => {
    const [error, event] = s.validate({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO'
    }, struct.event, { coerce: true })

    expect(error).toBeUndefined()
    expect(event.type).toBe('sfu/event')
    expect(uuid.validate(event.id)).toBeTruthy()
    expect(Date.parse(event.created_at)).not.toBeNaN()
  })

  test('Fail invalid types - content', () => {
    expect(s.is({
      content: 'test',
      key: uuid.v4(),
      source: 'DEMO'
    }, struct.event)).toBeFalsy()
  })

  test('Fail invalid types - key', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      source: 'DEMO',
      key: new Date()
    }, struct.event)).toBeFalsy()
  })

  test('Fail invalid types - id', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO',
      id: 1
    }, struct.event)).toBeFalsy()
  })

  test('Fail invalid types - type', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO',
      type: null
    }, struct.event)).toBeFalsy()

    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO',
      type: 'event'
    }, struct.event)).toBeFalsy()
  })

  test('Fail invalid types - created_at', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO',
      created_at: null
    }, struct.event)).toBeFalsy()

    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 'DEMO',
      created_at: '2021-01-02T00:00:00Z+1'
    }, struct.event)).toBeFalsy()
  })

  test('Fail invalid types - source', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      key: uuid.v4(),
      source: 0.2,
    }, struct.event)).toBeFalsy()
  })

  test('Success namespaced type', () => {
    expect(s.is({
      content: { value: 'wolololo' },
      type: 'sfu/event/package-delivered',
      key: uuid.v4(),
      source: 'TEST',
    }, struct.event)).toBeTruthy()

    expect(s.is({
      content: { value: 'wolololo' },
      type: 'sfu/event/package-delivered',
      key: uuid.v4(),
      source: 'TEST',
    }, struct.event)).toBeTruthy()

    expect(s.is({
      content: { value: 'wolololo' },
      type: 'sfu/event/package-delivered/otherthing',
      key: uuid.v4(),
      source: 'TEST',
    }, struct.event)).toBeTruthy()

    expect(s.is({
      content: { value: 'wolololo' },
      type: 'sfu/eventpackage-delivered',
      key: uuid.v4(),
      source: 'TEST',
    }, struct.event)).toBeFalsy()
  })
})
