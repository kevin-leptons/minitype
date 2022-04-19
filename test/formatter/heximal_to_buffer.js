'use strict'

const assert = require('assert')
const {heximalToBuffer} = require('../../lib/formatter')
const {Result} = require('../../lib')

describe('formatter.heximalToBuffer', () => {
    it('not a string, return error', () => {
        let input = undefined
        let actualResult = heximalToBuffer(input)
        let expectedResult = Result.typeError('expect HeximalByteArray')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('empty string, return error', () => {
        let input = ''
        let actualResult = heximalToBuffer(input)
        let expectedResult = Result.typeError('expect HeximalByteArray')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('has invalid symbols, return error', () => {
        let input = '0xZ'
        let actualResult = heximalToBuffer(input)
        let expectedResult = Result.typeError('expect HeximalByteArray')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x, return empty buffer', () => {
        let input = '0x'
        let actualResult = heximalToBuffer(input)
        let expectedData = Buffer.from([])
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x0, return [0]', () => {
        let input = '0x0'
        let actualResult = heximalToBuffer(input)
        let expectedData = Buffer.from([0])
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x00, return [0]', () => {
        let input = '0x00'
        let actualResult = heximalToBuffer(input)
        let expectedData = Buffer.from([0])
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('even digits, return correct result', () => {
        let input = '0xff12aa'
        let actualResult = heximalToBuffer(input)
        let expectedData = Buffer.from([0xff, 0x12, 0xaa])
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('odd digits, return correct result', () => {
        let input = '0x1ffcc'
        let actualResult = heximalToBuffer(input)
        let expectedData = Buffer.from([0x1, 0xff, 0xcc])
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
