const s = require('superstruct');
const { Message } = require('../../structures/message');

const message = {
    key: 'thekey',
    subject: 'thesubject',
    message: 'themessage',
    status: 'thestatus',
    from: 'thesender',
    source: ['thesource'],
    target: ['thetarget']
};

describe('Message object structure', () => {
    test('Success: minimum value', () => {
        let copy = JSON.parse(JSON.stringify(message));

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        });

        expect(error).toBeUndefined();
        expect(entity.channel).toBeUndefined();
        expect(entity).toHaveProperty('id');
        expect(entity).toHaveProperty('type');
        expect(entity).toHaveProperty('date');
    });

    test('Success: with channel', () => {
        let copy = JSON.parse(JSON.stringify(message));
        copy.channel = 'thechannel';

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        });

        expect(error).toBeUndefined();
        expect(entity.channel).toStrictEqual('thechannel');
        expect(entity).toHaveProperty('id');
        expect(entity).toHaveProperty('type');
        expect(entity).toHaveProperty('date');
    });

    test('Failed: minimum value', () => {
        let copy = JSON.parse(JSON.stringify(message));
        delete copy.subject;

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        });

        expect(error).toBeDefined();
        expect(error.key).toStrictEqual('subject');
        expect(entity).toBeUndefined();
    });

    test('Failed: wrong type', () => {
        let copy = JSON.parse(JSON.stringify(message));
        copy.type = 'other';

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        });

        expect(error).toBeDefined();
        expect(error.key).toStrictEqual('type');
        expect(entity).toBeUndefined();
    });

    test('Failed: wrong id', () => {
        let copy = JSON.parse(JSON.stringify(message));
        copy.id = 'thewrongid';

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        });

        expect(error).toBeDefined();
        expect(error.key).toStrictEqual('id');
        expect(entity).toBeUndefined();
    });

    test('Failed: wrong date', () => {
        let copy = JSON.parse(JSON.stringify(message));
        copy.date = 'thewrongdate';

        const [error, entity] = s.validate(copy, Message, {
            coerce: true, mask: true
        });

        expect(error).toBeDefined();
        expect(error.key).toStrictEqual('date');
        expect(entity).toBeUndefined();
    });
});
