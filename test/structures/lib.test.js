const Index = require('../../index')
const s = require('superstruct')
const { ZuluDateTimeStruct, Tz, consts } = require('../../structures/lib')
const ConstStruct = consts()

describe('Lib Phone object structure', () => {
  test('Success: Lib Phone structure', () => {
    for (const i of ['+3333333333', '003333333333', '+1 818 23424545']) {
      expect(RegExp(ConstStruct.pReg).test(i)).toBeTruthy()
    }
  })
  test('Failed: Lib Phone structure', () => {
    for (const i of ['??!!', '!3333333333', '818%%23424545']) {
      expect(RegExp(ConstStruct.pReg).test(i)).toBeFalsy()
    }
  })
})

describe('Lib Zoulou Date object structure', () => {
  test('Success: Lib Zoulou Date structure', () => {
    for (const i of ['2021-01-11T10:31:04.519Z', '2021-01-11T10:31:04Z']) {
      expect(RegExp(ConstStruct.zdReg).test(i)).toBeTruthy()
    }
  })
  test('Failed: Lib Zoulou Date structure', () => {
    for (const i of ['??!!', 'toto', '2021-01-11T10:31:04']) {
      expect(RegExp(ConstStruct.zdReg).test(i)).toBeFalsy()
    }
  })
})

describe('Lib ISO8601 Date object structure', () => {
  test.each([
    ['2021-01-11T10:31:04.519Z'],
    ['2021-01-11T10:31:04Z'],
    ['2021-01-11T10:31:04+01:00'],
    ['2021-01-11T10:31:04-01:00'],
    ['2021-01-11T10:31:04-01:00'],
    ['2021-01-11T10:31:04-0100'],
    ['2021-01-11T10:31:04+0830'],
    ['2021-01-11T10:31:04.123+0830'],
    ['2021-01-11T10:31:04.123-08:30']
  ])('Success: Lib ISO8601 Date structure %s', (string) => {
    expect(RegExp(ConstStruct.isoReg).test(string)).toBeTruthy()
  })
  test('Failed: Lib Zoulou Date structure', () => {
    for (const i of ['??!!', 'toto', '2021-01-11T10:31:04']) {
      expect(RegExp(ConstStruct.isoReg).test(i)).toBeFalsy()
    }
  })
})

describe('Time zone string format', () => {
  test('Success: Tz is valid', () => {
    expect(s.is('Europe/Paris', Tz)).toBeTruthy()
  })

  test('Fail: Tz is no valid', () => {
    expect(s.is('America/Bulp', Tz)).toBeFalsy()
  })
})

describe('Existing datetime format', () => {
  test('Success: ZuluDateTimeStruct is valid', () => {
    expect(s.is('2022-03-02T09:05:01.123Z', ZuluDateTimeStruct)).toBeTruthy()
    expect(s.is('2022-03-02T09:05:01.000Z', ZuluDateTimeStruct)).toBeTruthy()
    expect(s.is('2022-03-02T09:05:01Z', ZuluDateTimeStruct)).toBeTruthy()
    expect(s.is(new Date().toISOString(), ZuluDateTimeStruct)).toBeTruthy()
  })

  test('Fail: ZuluDateTimeStruct is no valid', () => {
    expect(s.is('2022-02-30T09:05:01.123Z', ZuluDateTimeStruct)).toBeFalsy()
    expect(s.is('2022-03-33T09:05:01.123Z', ZuluDateTimeStruct)).toBeFalsy()
  })
})
