'use strict'

/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {ByteData} = require('../../lib/byte')
const {Result} = require('../../lib')

describe('byte.ByteData.fromHeximal', () => {
    it('not a string, return error', () => {
        let input = undefined
        let actualResult = ByteData.fromHeximal(input)
        let expectedResult = Result.typeError('expect HeximalByteArray')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('empty string, return error', () => {
        let input = ''
        let actualResult = ByteData.fromHeximal(input)
        let expectedResult = Result.typeError('expect HeximalByteArray')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('has invalid symbols, return error', () => {
        let input = '0xZ'
        let actualResult = ByteData.fromHeximal(input)
        let expectedResult = Result.typeError('expect HeximalByteArray')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x, return []', () => {
        let input = '0x'
        let actualResult = ByteData.fromHeximal(input)
        let expectedData = ByteData.fromBuffer(
            Buffer.from([])
        ).open()
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x0, return [0]', () => {
        let input = '0x0'
        let actualResult = ByteData.fromHeximal(input)
        let expectedData = ByteData.fromBuffer(
            Buffer.from([0])
        ).open()
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x00, return [0]', () => {
        let input = '0x00'
        let actualResult = ByteData.fromHeximal(input)
        let expectedData = ByteData.fromBuffer(
            Buffer.from([0])
        ).open()
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('even digits, return correct result', () => {
        let input = '0x11ffcc'
        let actualResult = ByteData.fromHeximal(input)
        let expectedData = ByteData.fromBuffer(
            Buffer.from([0x11, 0xff, 0xcc])
        ).open()
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('odd digits, return correct result', () => {
        let input = '0x1ffcc'
        let actualResult = ByteData.fromHeximal(input)
        let expectedData = ByteData.fromBuffer(
            Buffer.from([0x1, 0xff, 0xcc])
        ).open()
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('byte.ByteData.eq', () => {
    it('target is not a ByteData, throws error', () => {
        let source = ByteData.fromHeximal('0x01ff').open()
        let target = undefined
        assert.throws(
            () => source.eq(target),
            {
                constructor: TypeError,
                message: 'expect ByteData'
            }
        )
    })
    it('the same length, source = target, return true', () => {
        let source = ByteData.fromHeximal('0x01ff').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.eq(target)
        let expectedResult = true
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('the same length, source < target, return false', () => {
        let source = ByteData.fromHeximal('0x01f0').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.eq(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('the same length, source > target, return false', () => {
        let source = ByteData.fromHeximal('0x02ff').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.eq(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('source length is less than target, return false', () => {
        let source = ByteData.fromHeximal('0x02').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.eq(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('source length is greater than target, return false', () => {
        let source = ByteData.fromHeximal('0x01ff00').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.eq(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('byte.ByteData.lt', () => {
    it('target is not a ByteData, throws error', () => {
        let source = ByteData.fromHeximal('0x01ff').open()
        let target = undefined
        assert.throws(
            () => source.lt(target),
            {
                constructor: TypeError,
                message: 'expect ByteData'
            }
        )
    })
    it('the same length, source = target, return false', () => {
        let source = ByteData.fromHeximal('0x01ff').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.lt(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('the same length, source < target, return true', () => {
        let source = ByteData.fromHeximal('0x01f0').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.lt(target)
        let expectedResult = true
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('the same length, source > target, return false', () => {
        let source = ByteData.fromHeximal('0x02ff').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.lt(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('source length is less than target, return true', () => {
        let source = ByteData.fromHeximal('0x02').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.lt(target)
        let expectedResult = true
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('source length is greater than target, return false', () => {
        let source = ByteData.fromHeximal('0x01ff00').open()
        let target = ByteData.fromHeximal('0x02ff').open()
        let actualResult = source.lt(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('byte.ByteData.gt', () => {
    it('target is not a ByteData, throws error', () => {
        let source = ByteData.fromHeximal('0x01ff').open()
        let target = undefined
        assert.throws(
            () => source.gt(target),
            {
                constructor: TypeError,
                message: 'expect ByteData'
            }
        )
    })
    it('the same length, source = target, return false', () => {
        let source = ByteData.fromHeximal('0x01ff').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.gt(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('the same length, source < target, return false', () => {
        let source = ByteData.fromHeximal('0x01f0').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.gt(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('the same length, source > target, return true', () => {
        let source = ByteData.fromHeximal('0x02ff').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.gt(target)
        let expectedResult = true
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('source length is less than target, return false', () => {
        let source = ByteData.fromHeximal('0x02').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.gt(target)
        let expectedResult = false
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('source length is greater than target, return true', () => {
        let source = ByteData.fromHeximal('0x01ff00').open()
        let target = ByteData.fromHeximal('0x01ff').open()
        let actualResult = source.gt(target)
        let expectedResult = true
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
