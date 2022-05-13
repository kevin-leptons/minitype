'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, PInt256} = require('../../lib')

describe('PInt256.fromNumber', () => {
    it('minimum value, return ok', () => {
        let input = 1
        let expectedData = new PInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return ok', () => {
        let input = 0x1fffffffffffff
        let expectedData = new PInt256(0x1fffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('zero, return error', () => {
        let input = 0
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x20000000000000
        let expectedResult = Result.typeError('overflow positive integer 53 bits')
        let actualResult = PInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt256.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.fromBigInt', () => {
    it('minimum value, return ok', () => {
        let input = 0x1n
        let expectedData = new PInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return ok', () => {
        let input = 2n ** 256n - 1n
        let expectedData = new PInt256(2n ** 256n - 1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('zero, return error', () => {
        let input = 0n
        let expectedResult = Result.typeError('expect big positive integer')
        let actualResult = PInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 2n ** 256n
        let expectedResult = Result.typeError('overflow positive integer 256 bits')
        let actualResult = PInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a BigInt, return error', () => {
        let input = 0xff
        let expectedResult = Result.typeError('expect type bigint')
        let actualResult = PInt256.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.fromDecimal', () => {
    it('minimum value, return ok', () => {
        let input = '1'
        let expectedData = new PInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return ok', () => {
        let input = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        let expectedData = new PInt256(115792089237316195423570985008687907853269984665640564039457584007913129639935n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('zero, return error', () => {
        let input = '0'
        let expectedResult = Result.typeError('expect a positive integer from decimal')
        let actualResult = PInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '115792089237316195423570985008687907853269984665640564039457584007913129639936'
        let expectedResult = Result.typeError('overflow decimal positive integer 256 bits')
        let actualResult = PInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a positive integer from decimal')
        let actualResult = PInt256.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.fromHeximal', () => {
    it('minimum value, return ok', () => {
        let input = '0x1'
        let expectedData = new PInt256(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return ok', () => {
        let input = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        let expectedData = new PInt256(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('odd quantity digits, return ok', () => {
        let input = '0x112'
        let expectedData = new PInt256(0x0112n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('zero, return error', () => {
        let input = '0x0'
        let expectedResult = Result.typeError('expect a positive integer from heximal')
        let actualResult = PInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x10000000000000000000000000000000000000000000000000000000000000000'
        let expectedResult = Result.typeError('overflow heximal 256 bits')
        let actualResult = PInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = PInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.eq', () => {
    it('number1 = number2, return true', () => {
        let number1 = PInt256.fromNumber(1379).open()
        let number2 = PInt256.fromNumber(1379).open()
        let actualResult = number1.eq(number2)
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 < number2, return false', () => {
        let number1 = PInt256.fromNumber(137).open()
        let number2 = PInt256.fromNumber(1379).open()
        let actualResult = number1.eq(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 > number2, return false', () => {
        let number1 = PInt256.fromNumber(1379).open()
        let number2 = PInt256.fromNumber(137).open()
        let actualResult = number1.eq(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.lt', () => {
    it('number1 = number2, return false', () => {
        let number1 = PInt256.fromNumber(1379).open()
        let number2 = PInt256.fromNumber(1379).open()
        let actualResult = number1.lt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 < number2, return true', () => {
        let number1 = PInt256.fromNumber(137).open()
        let number2 = PInt256.fromNumber(1379).open()
        let actualResult = number1.lt(number2)
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 > number2, return false', () => {
        let number1 = PInt256.fromNumber(1379).open()
        let number2 = PInt256.fromNumber(137).open()
        let actualResult = number1.lt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.gt', () => {
    it('number1 = number2, return false', () => {
        let number1 = PInt256.fromNumber(1379).open()
        let number2 = PInt256.fromNumber(1379).open()
        let actualResult = number1.gt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 < number2, return false', () => {
        let number1 = PInt256.fromNumber(137).open()
        let number2 = PInt256.fromNumber(1379).open()
        let actualResult = number1.gt(number2)
        let expectedResult = false
        assert.strictEqual(actualResult, expectedResult)
    })
    it('number1 > number2, return true', () => {
        let number1 = PInt256.fromNumber(1379).open()
        let number2 = PInt256.fromNumber(137).open()
        let actualResult = number1.gt(number2)
        let expectedResult = true
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.toDecimal', () => {
    it('return correct result', () => {
        let number = PInt256.fromNumber(13579).open()
        let expectedResult = '13579'
        let actualResult = number.toDecimal()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt256.toHeximal', () => {
    it('return correct result', () => {
        let number = PInt256.fromNumber(0x99ffaaee).open()
        let expectedResult = '0x99ffaaee'
        let actualResult = number.toHeximal()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
