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
        let expectedResult = Result.typeError('expect a heximal')
        let actualResult = UInt256.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
