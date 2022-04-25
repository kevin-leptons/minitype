'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

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
    it('odd quantity digits, return ok', () => {
        let input = '0x112'
        let expectedData = new UInt16(0x0112)
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
    it('0x, return error', () => {
        let input = '0x'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = UInt16.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0xZ a heximal, return error', () => {
        let input = '0xZ'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = UInt16.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt16.fromBuffer', () => {
    it('minimum value, return correct result', () => {
        let input = Buffer.from('0001', 'hex')
        let expectedData = UInt16.fromHeximal('0x1').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return correct result', () => {
        let input = Buffer.from('ffff', 'hex')
        let expectedData = UInt16.fromHeximal('0xffff').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('all zero bytes, return correct result', () => {
        let input = Buffer.from('0000', 'hex')
        let expectedData = UInt16.fromHeximal('0x0000').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('no bytes, return error', () => {
        let input = Buffer.from([])
        let expectedResult = Result.typeError('expect buffer 1-2 bytes')
        let actualResult = UInt16.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = Buffer.from('010000', 'hex')
        let expectedResult = Result.typeError('expect buffer 1-2 bytes')
        let actualResult = UInt16.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt16.fromFixedBuffer', () => {
    it('minimum value, return correct result', () => {
        let input = Buffer.from('0001', 'hex')
        let expectedData = UInt16.fromHeximal('0x1').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return correct result', () => {
        let input = Buffer.from('ffff', 'hex')
        let expectedData = UInt16.fromHeximal('0xffff').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('all zero bytes, return correct result', () => {
        let input = Buffer.from('0000', 'hex')
        let expectedData = UInt16.fromHeximal('0x0000').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt16.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('no bytes, return error', () => {
        let input = Buffer.from([])
        let expectedResult = Result.typeError('expect buffer 2 bytes')
        let actualResult = UInt16.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not enough data, return error', () => {
        let input = Buffer.from('00', 'hex')
        let expectedResult = Result.typeError('expect buffer 2 bytes')
        let actualResult = UInt16.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = Buffer.from('010000', 'hex')
        let expectedResult = Result.typeError('expect buffer 2 bytes')
        let actualResult = UInt16.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
