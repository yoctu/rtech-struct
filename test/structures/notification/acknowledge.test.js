const s = require('superstruct')
const { notification } = require('../../../index')

const acknowledge = notification().acknowledge

describe('Notification object structure', () => {
  const uuid_1 = require('uuid').v4()
  const uuid_2 = require('uuid').v4()

  test('Success: Acknowledge structure', () => {
    expect(s.is({
      name: 'Fast Reader',
      notificationsIds: [uuid_1, uuid_2]
    }, acknowledge.structure)).toBeTruthy()

    const [err0, val0] = s.validate({
      name: 'Fast Reader',
      notificationsIds: [uuid_1, uuid_2]
    }, acknowledge.structure, {
      coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
    expect(val0).toHaveProperty('notificationsIds', [uuid_1, uuid_2])
    expect(val0).toHaveProperty('name', 'Fast Reader')
  })

  test('Fail: Acknowledge structure fail', () => {
    let [error] = s.validate({
      name: 'Fast Reader'
    }, acknowledge.structure, {
      coerce: true, mask: true
    })

    expect(error).toHaveProperty('key', 'notificationsIds')

    let [error2] = s.validate({
      notificationsIds: [uuid_1, uuid_2]
    }, acknowledge.structure, {
      coerce: true, mask: true
    })

    expect(error2).toHaveProperty('key', 'name')

    let [error3] = s.validate({
      name: 'Fast Reader',
      notificationsIds: ['bli', 'bla', 'blou']
    }, acknowledge.structure, {
      coerce: true, mask: true
    })

    expect(error3).toHaveProperty('path', [ 'notificationsIds', 0 ])
    expect(error3).toHaveProperty('value', 'bli')
  })
})
