'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, UInt256} = require('../../lib')

describe('UInt256.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new UInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0x1fffffffffffff
        let expectedData = new UInt256(0x1fffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x20000000000000
        let expectedResult = Result.typeError('overflow unsigned integer 53 bits')
        let actualResult = UInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a unsigned integer')
        let actualResult = UInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.fromBigInt', () => {
    it('min value, return ok', () => {
        let input = 0x1n
        let expectedData = new UInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 2n ** 256n - 1n
        let expectedData = new UInt256(2n ** 256n - 1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 2n ** 256n
        let expectedResult = Result.typeError('overflow unsigned integer 256 bits')
        let actualResult = UInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a BigInt, return error', () => {
        let input = 0xff
        let expectedResult = Result.typeError('expect type bigint')
        let actualResult = UInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new UInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        let expectedData = new UInt256(115792089237316195423570985008687907853269984665640564039457584007913129639935n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '115792089237316195423570985008687907853269984665640564039457584007913129639936'
        let expectedResult = Result.typeError('overflow decimal unsigned integer 256 bits')
        let actualResult = UInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = UInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new UInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        let expectedData = new UInt256(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x10000000000000000000000000000000000000000000000000000000000000000'
        let expectedResult = Result.typeError('overflow heximal 256 bits')
        let actualResult = UInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = UInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.toDecimal', () => {
    it('return correct result', () => {
        let number = UInt256.fromNumber(13579).open()
        let expectedResult = '13579'
        let actualResult = number.toDecimal()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.toHeximal', () => {
    it('return correct result', () => {
        let number = UInt256.fromNumber(0x99ffaaee).open()
        let expectedResult = '0x99ffaaee'
        let actualResult = number.toHeximal()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.isZero', () => {
    it('zero, return true', () => {
        let n = UInt256.fromNumber(0).open()
        let actualResult = n.isZero()
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
    it('one, return false', () => {
        let n = UInt256.fromNumber(1).open()
        let actualResult = n.isZero()
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.eq', () => {
    it('number1 = number2, return true', () => {
        let number1 = UInt256.fromNumber(1379).open()
        let number2 = UInt256.fromNumber(1379).open()
        let actualResult = number1.eq(number2)
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 < number2, return false', () => {
        let number1 = UInt256.fromNumber(137).open()
        let number2 = UInt256.fromNumber(1379).open()
        let actualResult = number1.eq(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 > number2, return false', () => {
        let number1 = UInt256.fromNumber(1379).open()
        let number2 = UInt256.fromNumber(137).open()
        let actualResult = number1.eq(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.lt', () => {
    it('number1 = number2, return false', () => {
        let number1 = UInt256.fromNumber(1379).open()
        let number2 = UInt256.fromNumber(1379).open()
        let actualResult = number1.lt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 < number2, return true', () => {
        let number1 = UInt256.fromNumber(137).open()
        let number2 = UInt256.fromNumber(1379).open()
        let actualResult = number1.lt(number2)
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 > number2, return false', () => {
        let number1 = UInt256.fromNumber(1379).open()
        let number2 = UInt256.fromNumber(137).open()
        let actualResult = number1.lt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('UInt256.gt', () => {
    it('number1 = number2, return false', () => {
        let number1 = UInt256.fromNumber(1379).open()
        let number2 = UInt256.fromNumber(1379).open()
        let actualResult = number1.gt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 < number2, return false', () => {
        let number1 = UInt256.fromNumber(137).open()
        let number2 = UInt256.fromNumber(1379).open()
        let actualResult = number1.gt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 > number2, return true', () => {
        let number1 = UInt256.fromNumber(1379).open()
        let number2 = UInt256.fromNumber(137).open()
        let actualResult = number1.gt(number2)
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
})
