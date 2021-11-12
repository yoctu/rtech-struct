const s = require('superstruct')
const { messageAt } = require('../../../structures/sfu/messageAt')

describe('MessageAt object structure', () => {
  test('Success: message at', () => {
    const [error, entity] = s.validate({
      at: '2021-11-11T20:00:00Z',
      message: "This is a message"
    }, messageAt, { coerce: true })

    expect(error).toBeUndefined()
  });

  test('Success: message at default date', () => {
    const [error, entity] = s.validate({
      message: "This is a message"
    }, messageAt, { coerce: true })

    expect(error).toBeUndefined()
    expect(entity.at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|(\+|\-)\d{2}:\d{2})$/)
  });
})
