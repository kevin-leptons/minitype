'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, PInt64} = require('../../lib')

describe('PInt64.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new PInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0x1fffffffffffff
        let expectedData = new PInt64(0x1fffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x20000000000000
        let expectedResult = Result.typeError('overflow unsigned integer 53 bits')
        let actualResult = PInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt64.fromBigInt', () => {
    it('min value, return ok', () => {
        let input = 0x1n
        let expectedData = new PInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0xffffffffffffffffn
        let expectedData = new PInt64(0xffffffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x10000000000000000n
        let expectedResult = Result.typeError('overflow positive integer 64 bits')
        let actualResult = PInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a BigInt, return error', () => {
        let input = 0xff
        let expectedResult = Result.typeError('expect a big positive integer')
        let actualResult = PInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt64.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new PInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '18446744073709551615'
        let expectedData = new PInt64(18446744073709551615n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '18446744073709551616'
        let expectedResult = Result.typeError('overflow decimal, positive integer 64 bits')
        let actualResult = PInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = PInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt64.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new PInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0xffffffffffffffff'
        let expectedData = new PInt64(0xffffffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('odd quantity digits, return ok', () => {
        let input = '0x112'
        let expectedData = new PInt64(0x0112n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x10000000000000000'
        let expectedResult = Result.typeError('overflow heximal 64 bits')
        let actualResult = PInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = PInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
