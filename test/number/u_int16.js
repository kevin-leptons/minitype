'use strict'

/* eslint-disable max-len */

const assert = require('assert')
const {Result, UInt16} = require('../../lib')

describe('UInt16.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new UInt16(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0xffff
        let expectedData = new UInt16(0xffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x10000
        let expectedResult = Result.typeError('overflow unsigned integer 16 bits')
        let actualResult = UInt16.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a unsigned integer')
        let actualResult = UInt16.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt16.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new UInt16(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '65535'
        let expectedData = new UInt16(65535)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '65536'
        let expectedResult = Result.typeError('overflow decimal unsigned integer 16 bits')
        let actualResult = UInt16.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = UInt16.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt16.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new UInt16(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0xffff'
        let expectedData = new UInt16(0xffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x10000'
        let expectedResult = Result.typeError('overflow heximal 16 bits')
        let actualResult = UInt16.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect a heximal')
        let actualResult = UInt16.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
