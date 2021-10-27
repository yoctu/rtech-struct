const s = require('superstruct')
const { notification } = require('../../../index')

const inApp = notification().inApp

describe('Notification object structure', () => {
  test('Success: Notification structure', () => {
    expect(s.is({
      content: {'test':'test'},
      notification_type: 'auction won',
      id: require('uuid').v4(),
      createdAt: new Date().toISOString()
    }, inApp.structure)).toBeTruthy()


    const [err0, val0] = s.validate({
      content: {'test':'test'},
      notification_type: 'auction won',
      id: require('uuid').v4(),
      createdAt: new Date().toISOString()
    }, inApp.structure, {
      coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Fail: Notification structure fail', () => {
    let [error] = s.validate({
      notification_type: 'auction won'
    }, inApp.structure, {
      coerce: true, mask: true
    })

    expect(error).toHaveProperty('key', 'content')

    let [error2] = s.validate({
      content: {'test':'test'},
    }, inApp.structure, {
      coerce: true, mask: true
    })

    expect(error2).toHaveProperty('key', 'notification_type')
  })
})
