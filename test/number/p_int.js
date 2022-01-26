'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, PInt} = require('../../lib')

describe('PInt.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new PInt(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0x1fffffffffffff
        let expectedData = new PInt(0x1fffffffffffff)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x20000000000000
        let expectedResult = Result.typeError('overflow positive integer 53 bits')
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('zero, return error', () => {
        let input = 0
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('negative, return error', () => {
        let input = -1
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('float, return error', () => {
        let input = 1.2
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a positive integer')
        let actualResult = PInt.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('PInt.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new PInt(1)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '9007199254740991'
        let expectedData = new PInt(9007199254740991)
        let expectedResult = Result.ok(expectedData)
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '9007199254740992'
        let expectedResult = Result.typeError('overflow decimal positive integer 53 bits')
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('zero, return error', () => {
        let input = '0'
        let expectedResult = Result.typeError('expect a decimal of positive integer')
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('negative, return error', () => {
        let input = '-1'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('float, return error', () => {
        let input = '1.2'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a integer decimal, return error', () => {
        let input = '1.a'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = PInt.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
