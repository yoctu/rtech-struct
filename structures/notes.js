const s = require("superstruct")

exports.notes = s.optional(s.size(s.string(), 2, 512))
