'use strict'

/* eslint-disable max-len */

const assert = require('assert')
const {Result, UInt8} = require('../../lib')

describe('UInt8.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new UInt8(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt8.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0xff
        let expectedData = new UInt8(0xff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt8.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x100
        let expectedResult = Result.typeError('overflow unsigned integer 8 bits')
        let actualResult = UInt8.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a unsigned integer')
        let actualResult = UInt8.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt8.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new UInt8(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt8.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '255'
        let expectedData = new UInt8(255)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt8.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '256'
        let expectedResult = Result.typeError('overflow decimal unsigned integer 8 bits')
        let actualResult = UInt8.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = UInt8.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt8.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new UInt8(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt8.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0xff'
        let expectedData = new UInt8(0xff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt8.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x100'
        let expectedResult = Result.typeError('overflow heximal 8 bits')
        let actualResult = UInt8.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect a heximal')
        let actualResult = UInt8.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
