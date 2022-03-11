'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, DataSize} = require('../lib')

describe('DataSize.fromString', () => {
    it('0, return 0 bytes', () => {
        let input = '0'
        let instance = new DataSize(0n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('0.1, return 0 bytes', () => {
        let input = '0.1'
        let instance = new DataSize(0n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('1.1, return 1 bytes', () => {
        let input = '1.1'
        let instance = new DataSize(1n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1KB, return 3.1 * 1024 bytes', () => {
        let input = '3.1KB'
        let instance = new DataSize(3n * 1024n + 102n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1MB, return 3.1 * 1024 ^ 2 bytes', () => {
        let input = '3.1MB'
        let instance = new DataSize(3n * 1024n ** 2n + 1024n ** 2n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1GB, return 3.1 * 1024 ^ 3 bytes', () => {
        let input = '3.1GB'
        let instance = new DataSize(3n * 1024n ** 3n + 1024n ** 3n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1TB, return 3.1 * 1024 ^ 4 bytes', () => {
        let input = '3.1TB'
        let instance = new DataSize(3n * 1024n ** 4n + 1024n ** 4n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1PB, return 3.1 * 1024 ^ 5 bytes', () => {
        let input = '3.1PB'
        let instance = new DataSize(3n * 1024n ** 5n + 1024n ** 5n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1EB, return 3.1 * 1024 ^ 6 bytes', () => {
        let input = '3.1EB'
        let instance = new DataSize(3n * 1024n ** 6n + 1024n ** 6n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1ZB, return 3.1 * 1024 ^ 7 bytes', () => {
        let input = '3.1ZB'
        let instance = new DataSize(3n * 1024n ** 7n + 1024n ** 7n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('3.1YB, return 3.1 * 1024 ^ 8 bytes', () => {
        let input = '3.1YB'
        let instance = new DataSize(3n * 1024n ** 8n + 1024n ** 8n / 10n)
        let expectedResult = Result.ok(instance)
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('not a string, return error', () => {
        let input = 123.321
        let expectedResult = Result.typeError('expect type string')
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
    it('has invalid symbol, return error', () => {
        let input = '123#@'
        let expectedResult = Result.typeError('expect data size string')
        let actualResult = DataSize.fromString(input)
        assert.deepStrictEqual(expectedResult, actualResult)
    })
})
