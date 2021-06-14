const s = require('superstruct')
const struct = require('../structures/filter')
const isUuid = require('is-uuid')

describe('Filter object structure', () => {
  test('Success: Filter structure', () => {
    expect(s.is({
      id: '89a4860a-3324-495b-83eb-8793bd59ab65',
      label: 'test',
      data: { value: 'test' }
    }, struct.filter)).toBeTruthy()
  })


  test('Success: Filter structure with default id', () => {
    const filter1 = s.create({
      label: 'test',
      data: { value: 'test' }
    }, struct.filter)

    const filter2 = s.create({
      label: 'test',
      data: { value: 'test' }
    }, struct.filter)

    expect(isUuid.v4(filter1.id)).toBeTruthy()
    expect(isUuid.v4(filter2.id)).toBeTruthy()
    expect(filter1.id).not.toStrictEqual(filter2.id)
  })

  test('Success: Filters structure', () => {
    expect(s.is([
      {
        id: '89a4860a-3324-495b-83eb-8793bd59ab65',
        label: 'test',
        data: { value: 'test' }
      },
      {
        id: '9928fb7d-1653-4d51-b1dc-f715d71ecf00',
        label: 'test 2',
        data: { value: 'test 2' }
      }
    ], struct.filters)).toBeTruthy()
  })

  test('Fail: Filter structure - wrong id', () => {
    const [error] = s.validate({ id: 'test' }, struct.filter)

    expect(error.message).toStrictEqual('At path: id -- Expected a value of type `uuid`, but received: `"test"`')
  })

  test('Fail: Filter structure - missing label', () => {
    const [error] = s.validate({ id: '89a4860a-3324-495b-83eb-8793bd59ab65' }, struct.filter)

    expect(error.message).toStrictEqual('At path: label -- Expected a string, but received: undefined')
  })

  test('Fail: Filter structure - wrong label', () => {
    const [error] = s.validate({
      id: '89a4860a-3324-495b-83eb-8793bd59ab65',
      label: 2,
    }, struct.filter)

    expect(error.message).toStrictEqual('At path: label -- Expected a string, but received: 2')
  })

  test('Fail: Filter structure - too short label', () => {
    const [error] = s.validate({
      id: '89a4860a-3324-495b-83eb-8793bd59ab65',
      label: 'a',
    }, struct.filter)

    expect(error.message).toStrictEqual('At path: label -- Expected a string with a length between `2` and `64` but received one with a length of `1`')
  })

  test('Fail: Filter structure - missing data', () => {
    const [error] = s.validate({
      id: '89a4860a-3324-495b-83eb-8793bd59ab65',
      label: 'test',
    }, struct.filter)

    expect(error.message).toStrictEqual('At path: data -- Expected an object, but received: undefined')
  })

  test('Fail: Filter structure - wrong data', () => {
    const [error] = s.validate({
      id: '89a4860a-3324-495b-83eb-8793bd59ab65',
      label: 'test',
      data: 'hey'
    }, struct.filter)

    expect(error.message).toStrictEqual('At path: data -- Expected an object, but received: "hey"')
  })

  test('Fail: Filters structure - invalid second element', () => {
    const [error] = s.validate([
      {
        id: '89a4860a-3324-495b-83eb-8793bd59ab65',
        label: 'test',
        data: { value: 'test' }
      },
      {
        id: '9928fb7d-1653-4d51-b1dc-f715d71ecf00',
      }
    ], struct.filters)

    expect(error.message).toStrictEqual('At path: 1.label -- Expected a string, but received: undefined')
  })
})
