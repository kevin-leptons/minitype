'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, UInt32} = require('../../lib')

describe('UInt32.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new UInt32(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt32.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0xffffffff
        let expectedData = new UInt32(0xffffffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt32.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x100000000
        let expectedResult = Result.typeError('overflow unsigned integer 32 bits')
        let actualResult = UInt32.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a unsigned integer')
        let actualResult = UInt32.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt32.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new UInt32(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt32.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '4294967295'
        let expectedData = new UInt32(4294967295)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt32.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '4294967296'
        let expectedResult = Result.typeError('overflow decimal unsigned integer 32 bits')
        let actualResult = UInt32.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = UInt32.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt32.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new UInt32(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt32.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0xffffffff'
        let expectedData = new UInt32(0xffffffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt32.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x100000000'
        let expectedResult = Result.typeError('overflow heximal 32 bits')
        let actualResult = UInt32.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = UInt32.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt32.format*', () => {
    it('format2', () => {
        let n = UInt32.fromNumber(1).open()
        let expectedResult = '01'
        let actualResult = n.format2()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format3', () => {
        let n = UInt32.fromNumber(1).open()
        let expectedResult = '001'
        let actualResult = n.format3()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format4', () => {
        let n = UInt32.fromNumber(123).open()
        let expectedResult = '0,123'
        let actualResult = n.format4()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format5', () => {
        let n = UInt32.fromNumber(123).open()
        let expectedResult = '00,123'
        let actualResult = n.format5()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format6', () => {
        let n = UInt32.fromNumber(123).open()
        let expectedResult = '000,123'
        let actualResult = n.format6()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format7', () => {
        let n = UInt32.fromNumber(123).open()
        let expectedResult = '0,000,123'
        let actualResult = n.format7()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format8', () => {
        let n = UInt32.fromNumber(123).open()
        let expectedResult = '00,000,123'
        let actualResult = n.format8()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format9', () => {
        let n = UInt32.fromNumber(123).open()
        let expectedResult = '000,000,123'
        let actualResult = n.format9()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
