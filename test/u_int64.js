'use strict'

const assert = require('assert')
const {UInt64} = require('../lib/number')

describe('UInt64', () => {
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
    it('format9', () => {
        let n = UInt64.fromNumber(123).open()
        let expectedResult = '000,000,123'
        let actualResult = n.format9()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
