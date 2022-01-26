'use strict'

const assert = require('assert')
const {
    FORMATTER,
    FORMATTER_2,
    FORMATTER_3,
    FORMATTER_4,
    FORMATTER_5,
    FORMATTER_6,
    FORMATTER_7,
    FORMATTER_8,
    FORMATTER_9
} = require('../../lib/number')._private

describe('number.FORMATTER', () => {
    it('1 return 1', () => {
        let input = 1
        let expectedResult = '1'
        let actualResult = FORMATTER.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234 return 1,234', () => {
        let input = 1234
        let expectedResult = '1,234'
        let actualResult = FORMATTER.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234567 return 1,234,567', () => {
        let input = 1234567
        let expectedResult = '1,234,567'
        let actualResult = FORMATTER.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_2', () => {
    it('1 return 01', () => {
        let input = 1
        let expectedResult = '01'
        let actualResult = FORMATTER_2.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('12 return 12', () => {
        let input = 12
        let expectedResult = '12'
        let actualResult = FORMATTER_2.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234 return 1,234', () => {
        let input = 1234
        let expectedResult = '1,234'
        let actualResult = FORMATTER_2.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_3', () => {
    it('1 return 001', () => {
        let input = 1
        let expectedResult = '001'
        let actualResult = FORMATTER_3.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('12 return 012', () => {
        let input = 12
        let expectedResult = '012'
        let actualResult = FORMATTER_3.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234 return 1,234', () => {
        let input = 1234
        let expectedResult = '1,234'
        let actualResult = FORMATTER_3.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_4', () => {
    it('1 return 0,001', () => {
        let input = 1
        let expectedResult = '0,001'
        let actualResult = FORMATTER_4.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234 return 1,234', () => {
        let input = 1234
        let expectedResult = '1,234'
        let actualResult = FORMATTER_4.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('12345 return 12,345', () => {
        let input = 12345
        let expectedResult = '12,345'
        let actualResult = FORMATTER_4.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_5', () => {
    it('1 return 00,001', () => {
        let input = 1
        let expectedResult = '00,001'
        let actualResult = FORMATTER_5.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234 return 01,234', () => {
        let input = 1234
        let expectedResult = '01,234'
        let actualResult = FORMATTER_5.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('123456 return 123,456', () => {
        let input = 123456
        let expectedResult = '123,456'
        let actualResult = FORMATTER_5.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_6', () => {
    it('1 return 000,001', () => {
        let input = 1
        let expectedResult = '000,001'
        let actualResult = FORMATTER_6.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('123456 return 123,456', () => {
        let input = 123456
        let expectedResult = '123,456'
        let actualResult = FORMATTER_6.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234567 return 1,234,567', () => {
        let input = 1234567
        let expectedResult = '1,234,567'
        let actualResult = FORMATTER_6.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_7', () => {
    it('1 return 0,000,001', () => {
        let input = 1
        let expectedResult = '0,000,001'
        let actualResult = FORMATTER_7.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234567 return 1,234,567', () => {
        let input = 1234567
        let expectedResult = '1,234,567'
        let actualResult = FORMATTER_7.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('12345678 return 12,345,678', () => {
        let input = 12345678
        let expectedResult = '12,345,678'
        let actualResult = FORMATTER_7.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_8', () => {
    it('1 return 00,000,001', () => {
        let input = 1
        let expectedResult = '00,000,001'
        let actualResult = FORMATTER_8.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('12345678 return 12,345,678', () => {
        let input = 12345678
        let expectedResult = '12,345,678'
        let actualResult = FORMATTER_8.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('123456789 return 123,456,789', () => {
        let input = 123456789
        let expectedResult = '123,456,789'
        let actualResult = FORMATTER_8.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('number.FORMATTER_9', () => {
    it('1 return 000,000,001', () => {
        let input = 1
        let expectedResult = '000,000,001'
        let actualResult = FORMATTER_9.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('123456789 return 123,456,789', () => {
        let input = 123456789
        let expectedResult = '123,456,789'
        let actualResult = FORMATTER_9.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('1234567891 return 1,234,567,891', () => {
        let input = 1234567891
        let expectedResult = '1,234,567,891'
        let actualResult = FORMATTER_9.format(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
