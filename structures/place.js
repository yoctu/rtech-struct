const s = require('superstruct')
const {Tz} = require('./lib')

exports.place = function (s) {
    return s.tuple([s.size(s.string(), 2, 128), s.size(s.string(), 1, 32), s.size(s.string(), 2, 64), s.size(s.string(), 2, 32), s.size(s.string(), 2, 32)])
}

exports.placeTZ = function (s) {
    return s.tuple([s.size(s.string(), 2, 128), s.size(s.string(), 1, 32), s.size(s.string(), 2, 64), s.size(s.string(), 2, 32), s.size(s.string(), 2, 32), s.optional(Tz)])
}

exports.completePlaceTZ = function (s) {
    return s.tuple(
        [
            s.size(s.string(), 2, 128),
            s.size(s.string(), 1, 32),
            s.size(s.string(), 2, 64),
            s.size(s.string(), 2, 32),
            s.size(s.string(), 2, 32),
            s.optional(Tz),
            s.optional(s.size(s.string(), 2, 128))
        ])
}

exports.placeChecker = s.dynamic((v, p) => {
    let size = v ? v.length : 0;
    switch (size) {
        case 5:
            return exports.place(s)
        case 6:
            return exports.placeTZ(s)
        case 7:
            return exports.completePlaceTZ(s)
        default:
            return exports.place(s)
    }
});
