const s = require('superstruct')
const {multistep, packageV1, packageV2} = require('../structures/multistep')

describe('Dimension structure', () => {
  test('Success: Mulstistep structure', () => {
    expect(s.is([
      "1", "3",
      "2", "100", "100", "100", "10", "", "no", "", "", "", "0", "1", "EG2102EF54-A-a",
      "30 rue des romains", "57970", "yutz", "France", "FR", "49.35,6.18", "Test 1", "Test 1", "test1@test.test", "300000000", "2021-03-03T12:00:00.000Z",
      "8 rue bellevue", "57600", "forbach", "France", "FR", "49.19, 6.89", "Test 2", "Test 2", "test2@test.test", "300000002", "2021-03-03T13:30:00.000Z",
      "19 Rue Edmond Reuter", "5326", "Contern", "Luxembourg", "LU", "49.59,6.22", "Test 3", "Test 3", "test3@test.test", "300000003", "2021-03-03T15:30:00.000Z"
    ], multistep)).toBeTruthy()
  })

  test('Failed: Mulstistep structure (missing an address)', () => {
    expect(s.is([
      "1", "1",
      "2", "100", "100", "100", "10", "", "no", "", "", "", "0", "1", "EG2102EF54-A-a",
      "30 rue des romains", "57970", "yutz", "France", "FR", "49.35,6.18", "Test 1", "Test 1", "test1@test.test", "300000000", "2021-03-03T12:00:00.000Z",
    ], multistep)).toBeFalsy()
  })

  test('Success: package v1 structure', () => {
    expect(s.is([
      "1", "100", "120", "120","5", "no"
    ], packageV1)).toBeTruthy()
  })

  test('Failed: package v1 structure', () => {
    expect(s.is([
      "1", "no"
    ], packageV1)).toBeFalsy()
  })

  test('Success: package v2 structure', () => {
    expect(s.is([
      "1", "100", "120", "120","5", "no", "TOXIC LIQUID", "100", "Premium Inurance"
    ], packageV2)).toBeTruthy()
  })

  test('Failed: package v2 structure', () => {
    expect(s.is([
      "1", "100", "120", "120","5", "no"
    ], packageV2)).toBeFalsy()
  })
})

