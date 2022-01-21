'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {UInt32} = require('../lib/number')

describe('UInt32', () => {
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
