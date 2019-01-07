const add = require('../src/lib/add')

test('1 + 1 = 2', function () {
  expect(add(1, 1)).toBe(2)
})