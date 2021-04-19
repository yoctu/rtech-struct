const zdReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/
const pReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/

exports.zouloudate = function (s) {
  return s.pattern(s.string(), zdReg)
}

exports.phone = function (s) {
  return s.pattern(s.string(), pReg)
}

exports.consts = function () {
  return { zdReg, pReg }
}

exports.gpsarray = function (s){
  return s.array(s.pattern(s.string(), /(-)?\d+\.\d+/))
}

exports.gpsstring = function (s){
  return s.pattern(s.string(), /(-)?\d+\.\d+,(-)?\d+\.\d+/)
}
