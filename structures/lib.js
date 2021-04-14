const s = require('superstruct')

const zdReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/
const pReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/

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

exports.phone = function (s) {
  return s.pattern(s.string(), pReg)
}

exports.consts = function () {
  return { zdReg, pReg }
}
