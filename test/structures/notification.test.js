const s = require('superstruct')
const struct = require('../../structures/notification')

describe('Notification object structure', () => {
  test('Success: Notification structure', () => {
    expect(s.is({
      content: {'test':'test'},
      createdAt: new Date().toISOString(),
      id: require('uuid').v4(),
      type: 'auction won'
    }, struct.notification)).toBeTruthy()


    const [err0, val0] = s.validate({
      content: {'test':'test'},
      createdAt: new Date().toISOString(),
      id: require('uuid').v4(),
      type: 'auction won'
    }, struct.notification, {
      coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
  })

  test('Fail: Notification structure fail', () => {
    let [error, value] = s.validate({
      type: 'auction won'
    }, struct.notification, {
      coerce: true, mask: true
    })

    expect(error).toHaveProperty('key', 'content')

    let [error2, value2] = s.validate({
      content: {'test':'test'},
    }, struct.notification, {
      coerce: true, mask: true
    })

    expect(error2).toHaveProperty('key', 'type')
  })
})
