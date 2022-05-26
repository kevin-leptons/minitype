'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, UInt64} = require('../../lib')

describe('UInt64.fromNumber', () => {
    it('min value, return ok', () => {
        let input = 1
        let expectedData = new UInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0x1fffffffffffff
        let expectedData = new UInt64(0x1fffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x20000000000000
        let expectedResult = Result.typeError('overflow unsigned integer 53 bits')
        let actualResult = UInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a number, return error', () => {
        let input = '1'
        let expectedResult = Result.typeError('expect a unsigned integer')
        let actualResult = UInt64.fromNumber(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.fromBigInt', () => {
    it('min value, return ok', () => {
        let input = 0x1n
        let expectedData = new UInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = 0xffffffffffffffffn
        let expectedData = new UInt64(0xffffffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = 0x10000000000000000n
        let expectedResult = Result.typeError('overflow unsigned integer 64 bits')
        let actualResult = UInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a BigInt, return error', () => {
        let input = 0xff
        let expectedResult = Result.typeError('expect type bigint')
        let actualResult = UInt64.fromBigInt(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.fromDecimal', () => {
    it('min value, return ok', () => {
        let input = '1'
        let expectedData = new UInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '18446744073709551615'
        let expectedData = new UInt64(18446744073709551615n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '18446744073709551616'
        let expectedResult = Result.typeError('overflow decimal unsigned integer 64 bits')
        let actualResult = UInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a decimal, return error', () => {
        let input = '1x'
        let expectedResult = Result.typeError('expect a unsigned integer from decimal')
        let actualResult = UInt64.fromDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.toNumber', () => {
    it('minimum value, return correct result', () => {
        let n = UInt64.fromNumber(0).open()
        let expectedResult = 0
        let actualResult = n.toNumber()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return correct result', () => {
        let n = UInt64.fromNumber(Number.MAX_SAFE_INTEGER).open()
        let expectedResult = Number.MAX_SAFE_INTEGER
        let actualResult = n.toNumber()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow value, throw error', () => {
        let n = UInt64.fromBigInt(0x20000000000000n).open()
        assert.throws(
            () => n.toNumber(),
            {
                constructor: Error,
                message: 'overflow unsigned integer 53 bits'
            }
        )
    })
})
describe('UInt64.toDecimal', () => {
    it('return correct result', () => {
        let number = UInt64.fromNumber(0x143).open()
        let expectedResult = '323'
        let actualResult = number.toDecimal()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.toHeximal', () => {
    it('return correct result', () => {
        let number = UInt64.fromNumber(0x99ffaaee).open()
        let expectedResult = '0x99ffaaee'
        let actualResult = number.toHeximal()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.fromHeximal', () => {
    it('min value, return ok', () => {
        let input = '0x1'
        let expectedData = new UInt64(1n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('max value, return ok', () => {
        let input = '0xffffffffffffffff'
        let expectedData = new UInt64(0xffffffffffffffffn)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('odd quantity digits, return ok', () => {
        let input = '0x112'
        let expectedData = new UInt64(0x0112n)
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = '0x10000000000000000'
        let expectedResult = Result.typeError('overflow heximal 64 bits')
        let actualResult = UInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not a heximal, return error', () => {
        let input = '0xK'
        let expectedResult = Result.typeError('expect Heximal')
        let actualResult = UInt64.fromHeximal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.format*', () => {
    it('format2', () => {
        let n = UInt64.fromNumber(1).open()
        let expectedResult = '01'
        let actualResult = n.format2()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format3', () => {
        let n = UInt64.fromNumber(1).open()
        let expectedResult = '001'
        let actualResult = n.format3()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format4', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '0,123'
        let actualResult = n.format4()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format5', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '00,123'
        let actualResult = n.format5()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format6', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '000,123'
        let actualResult = n.format6()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format7', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '0,000,123'
        let actualResult = n.format7()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format8', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '00,000,123'
        let actualResult = n.format8()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('format9', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '000,000,123'
        let actualResult = n.format9()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.fromBuffer', () => {
    it('minimum value, return correct result', () => {
        let input = Buffer.from('01', 'hex')
        let expectedData = UInt64.fromHeximal('0x1').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return correct result', () => {
        let input = Buffer.from('ffffffffffffffff', 'hex')
        let expectedData = UInt64.fromHeximal('0xffffffffffffffff').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('all zero bytes, return correct result', () => {
        let input = Buffer.from('0000000000000000', 'hex')
        let expectedData = UInt64.fromHeximal('0x0000000000000000').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('no bytes, return error', () => {
        let input = Buffer.from([])
        let expectedResult = Result.typeError('expect buffer 1-8 bytes')
        let actualResult = UInt64.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = Buffer.from('010000000000000000', 'hex')
        let expectedResult = Result.typeError('expect buffer 1-8 bytes')
        let actualResult = UInt64.fromBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('UInt64.fromFixedBuffer', () => {
    it('minimum value, return correct result', () => {
        let input = Buffer.from('0000000000000001', 'hex')
        let expectedData = UInt64.fromHeximal('0x1').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('maximum value, return correct result', () => {
        let input = Buffer.from('ffffffffffffffff', 'hex')
        let expectedData = UInt64.fromHeximal('0xffffffffffffffff').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('all zero bytes, return correct result', () => {
        let input = Buffer.from('0000000000000000', 'hex')
        let expectedData = UInt64.fromHeximal('0x0000000000000000').open()
        let expectedResult = Result.ok(expectedData)
        let actualResult = UInt64.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('no bytes, return error', () => {
        let input = Buffer.from([])
        let expectedResult = Result.typeError('expect buffer 8 bytes')
        let actualResult = UInt64.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not enough data, return error', () => {
        let input = Buffer.from('ff', 'hex')
        let expectedResult = Result.typeError('expect buffer 8 bytes')
        let actualResult = UInt64.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('overflow, return error', () => {
        let input = Buffer.from('010000000000000000', 'hex')
        let expectedResult = Result.typeError('expect buffer 8 bytes')
        let actualResult = UInt64.fromFixedBuffer(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
