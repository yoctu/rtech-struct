const s = require('superstruct')

const zdReg = /^(?<dateTime>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.\d{3})?Z$/
const isoReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|(\+|\-)\d{2}:?\d{2})$/
const pReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/

exports.ZuluDateTimeStruct = s.define('ZuluDateTimeStruct', (date) => {
  try {
    // * Test the regex on the date and only get the datetime group without the µs
    const rgResult = zdReg.exec(date)

    if (rgResult === null) {
      return false
    }

    // * return the comparison between the formatted date and the datetime group
    // * if the formatted date does not exist, like 30th of February, they will be different
    return (new Date(date)).toISOString().includes(rgResult.groups.dateTime)
  } catch (error) {
    return false
  }
});

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

exports.isodate = function () {
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
