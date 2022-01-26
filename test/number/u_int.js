'use strict'

/* eslint-disable max-len */

const assert = require('assert')
const {Result, UInt} = require('../../lib')

describe('UInt.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new UInt(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0x1fffffffffffff
        let expectedData = new UInt(0x1fffffffffffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = Number.MAX_SAFE_INTEGER + 1
        let expectedResult = Result.typeError('overflow unsigned integer 53 bits')
        let actualResult = UInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a unsigned integer')
        let actualResult = UInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new UInt(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '9007199254740991'
        let expectedData = new UInt(9007199254740991)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '9007199254740992'
        let expectedResult = Result.typeError('overflow unsigned integer decimal 53 bits')
        let actualResult = UInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer decimal')
        let actualResult = UInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new UInt(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0x1fffffffffffff'
        let expectedData = new UInt(0x1fffffffffffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x20000000000000'
        let expectedResult = Result.typeError('overflow heximal 53 bits')
        let actualResult = UInt.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect a heximal')
        let actualResult = UInt.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt.add', () => {
    it('return correct result', () => {
        let n1 = UInt.fromNumber(1).open()
        let n2 = UInt.fromNumber(2).open()
        let expectedResult = new UInt(3)
        let actualResult = n1.add(n2)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, throws error', () => {
        let n1 = UInt.fromNumber(Number.MAX_SAFE_INTEGER).open()
        let n2 = UInt.fromNumber(1).open()
        assert.throws(
            () => n1.add(n2),
            {
                constructor: TypeError,
                message: 'overflow unsigned integer 53 bits'
            }
        )
    })
})
describe('UInt.sub', () => {
    it('return correct result', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(1).open()
        let expectedResult = new UInt(2)
        let actualResult = n1.sub(n2)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('negative result, throws error', () => {
        let n1 = UInt.fromNumber(2).open()
        let n2 = UInt.fromNumber(3).open()
        assert.throws(
            () => n1.sub(n2),
            {
                constructor: TypeError,
                message: 'negative result'
            }
        )
    })
})
describe('UInt.mul', () => {
    it('return correct result', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(2).open()
        let expectedResult = new UInt(6)
        let actualResult = n1.mul(n2)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, throws error', () => {
        let n1 = UInt.fromNumber(Number.MAX_SAFE_INTEGER).open()
        let n2 = UInt.fromNumber(2).open()
        assert.throws(
            () => n1.mul(n2),
            {
                constructor: TypeError,
                message: 'overflow unsigned integer 53 bits'
            }
        )
    })
})
describe('UInt.div', () => {
    it('return correct result', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(2).open()
        let expectedResult = new UInt(1)
        let actualResult = n1.div(n2)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('return zero result', () => {
        let n1 = UInt.fromNumber(2).open()
        let n2 = UInt.fromNumber(3).open()
        let expectedResult = new UInt(0)
        let actualResult = n1.div(n2)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('divisor is zero, throws error', () => {
        let n1 = UInt.fromNumber(1).open()
        let n2 = UInt.fromNumber(0).open()
        assert.throws(
            () => n1.div(n2),
            {
                constructor: TypeError,
                message: 'divide by zero'
            }
        )
    })
})
describe('UInt.eq', () => {
    it('equal, return true', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.eq(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('less than, return false', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(4).open()
        let actualResult = n1.eq(n2)
        assert.deepStrictEqual(actualResult, false)
    })
    it('greater than, return false', () => {
        let n1 = UInt.fromNumber(4).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.eq(n2)
        assert.deepStrictEqual(actualResult, false)
    })
})
describe('UInt.lt', () => {
    it('less than, return true', () => {
        let n1 = UInt.fromNumber(2).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.lt(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('equal, return false', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.lt(n2)
        assert.deepStrictEqual(actualResult, false)
    })
    it('greater than, return false', () => {
        let n1 = UInt.fromNumber(4).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.lt(n2)
        assert.deepStrictEqual(actualResult, false)
    })
})
describe('UInt.lte', () => {
    it('less than, return true', () => {
        let n1 = UInt.fromNumber(2).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.lte(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('equal, return true', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.lte(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('greater than, false', () => {
        let n1 = UInt.fromNumber(4).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.lte(n2)
        assert.deepStrictEqual(actualResult, false)
    })
})
describe('UInt.gt', () => {
    it('greater than, return true', () => {
        let n1 = UInt.fromNumber(4).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.gt(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('equal, return false', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.gt(n2)
        assert.deepStrictEqual(actualResult, false)
    })
    it('less than, false', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(4).open()
        let actualResult = n1.gt(n2)
        assert.deepStrictEqual(actualResult, false)
    })
})
describe('UInt.gte', () => {
    it('greater than, return true', () => {
        let n1 = UInt.fromNumber(4).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.gte(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('equal, return true', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(3).open()
        let actualResult = n1.gte(n2)
        assert.deepStrictEqual(actualResult, true)
    })
    it('less than, false', () => {
        let n1 = UInt.fromNumber(3).open()
        let n2 = UInt.fromNumber(4).open()
        let actualResult = n1.gte(n2)
        assert.deepStrictEqual(actualResult, false)
    })
})
