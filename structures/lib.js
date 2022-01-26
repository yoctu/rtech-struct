const s = require('superstruct')

const zdReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/
const isoReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|(\+|\-)\d{2}:?\d{2})$/
const pReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
const iso8601Reg = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/

exports.Tz = s.define('Tz', value => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value }).format();
    return true;
  } catch (e) {
    return false;
  }
})

exports.zouloudate = function (s) {
  return s.pattern(s.string(), zdReg)
}

exports.isodate = function (s) {
  return s.pattern(s.string(), isoReg)
}

exports.phone = function (s) {
  return s.pattern(s.string(), pReg)
}

exports.consts = function () {
  return { zdReg, pReg, isoReg }
}

exports.gpsarray = function (s) {
  return s.size(s.array(s.pattern(s.string(), /(-)?\d+\.\d+/)), 0, 2)
}

exports.gpsstring = function (s) {
  return s.pattern(s.string(), /(-)?\d+\.\d+,(-)?\d+\.\d+/)
}

exports.isodatetime = function () {
    return s.pattern(s.string(), iso8601Reg)
}