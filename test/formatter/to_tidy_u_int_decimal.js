'use strict'

const assert = require('assert')
const {toTidyUIntDecimal} = require('../../lib/formatter')
const {Result} = require('../../lib')

describe('formatter.toTidyUIntDecimal', () => {
    it('123, return 123', () => {
        let input = '123'
        let expectedResult = Result.ok('123')
        let actualResult = toTidyUIntDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('00123, return 123', () => {
        let input = '00123'
        let expectedResult = Result.ok('123')
        let actualResult = toTidyUIntDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('001230, return 1230', () => {
        let input = '001230'
        let expectedResult = Result.ok('1230')
        let actualResult = toTidyUIntDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('000, return 0', () => {
        let input = '000'
        let expectedResult = Result.ok('0')
        let actualResult = toTidyUIntDecimal(input)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
