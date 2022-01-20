'use strict'

/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Timespan} = require('../lib')

describe('Timespan.format', () => {
    it('0 return 00:00:00:000', () => {
        let timespan = new Timespan(0)
        let expectedResult = '00:00:00.000'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('1 return 00:00:00:001', () => {
        let timespan = new Timespan(1)
        let expectedResult = '00:00:00.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('999 return 00:00:00:999', () => {
        let timespan = new Timespan(999)
        let expectedResult = '00:00:00.999'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('1000 return 00:00:01:000', () => {
        let timespan = new Timespan(1000)
        let expectedResult = '00:00:01.000'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('1001 return 00:00:01:001', () => {
        let timespan = new Timespan(1001)
        let expectedResult = '00:00:01.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('59001 return 00:00:59:001', () => {
        let timespan = new Timespan(59001)
        let expectedResult = '00:00:59.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('60001 return 00:01:00:001', () => {
        let timespan = new Timespan(60001)
        let expectedResult = '00:01:00.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('61001 return 00:01:01:001', () => {
        let timespan = new Timespan(61001)
        let expectedResult = '00:01:01.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('3661001 return 01:01:01.001', () => {
        let timespan = new Timespan(3661001)
        let expectedResult = '01:01:01.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('360061001 return 100:01:01:001', () => {
        let timespan = new Timespan(360061001)
        let expectedResult = '100:01:01.001'
        let actualResult = timespan.format()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
