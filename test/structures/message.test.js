const s = require('superstruct')
const {Message} = require('../../structures/message')

const message = {
    key: 'thekey',
    subject: 'thesubject',
    message: 'themessage',
    status: 'thestatus',
    from: 'thesender',
    source: ['thesource'],
    target: ['thetarget']
}

describe('Message object structure', () => {
    test('Success: minimum value', () => {
        let copy = JSON.parse(JSON.stringify(message))

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        })

        expect(error).toBeUndefined()
        expect(entity.channel).toBeUndefined()
        expect(entity).toHaveProperty('id')
        expect(entity).toHaveProperty('type')
        expect(entity).toHaveProperty('date')
    })

    test('Success: with channel', () => {
        let copy = JSON.parse(JSON.stringify(message))
        copy.channel = 'thechannel'

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        })

        expect(error).toBeUndefined()
        expect(entity.channel).toStrictEqual('thechannel')
        expect(entity).toHaveProperty('id')
        expect(entity).toHaveProperty('type')
        expect(entity).toHaveProperty('date')
    })

    test('Failed: minimum value', () => {
        let copy = JSON.parse(JSON.stringify(message))
        delete copy.subject

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        })

        expect(error).toBeDefined()
        expect(error.key).toStrictEqual('subject')
    })

    test('Failed: wrong type', () => {
        let copy = JSON.parse(JSON.stringify(message))
        copy.type = 'other'

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        })

        expect(error).toBeDefined()
        expect(error.key).toStrictEqual('type')
    })
})
