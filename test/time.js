'use strict'

const assert = require('assert')
const {Timestamp} = require('../lib')

describe('Timestamp.toSeconds', () => {
    it('0, return 0', () => {
        let t = new Timestamp(0)
        let actualResult = t.toSeconds()
        let expectedResult = 0
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('999, return 0', () => {
        let t = new Timestamp(999)
        let actualResult = t.toSeconds()
        let expectedResult = 0
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('1000, return 1', () => {
        let t = new Timestamp(1000)
        let actualResult = t.toSeconds()
        let expectedResult = 1
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('1001, return 1', () => {
        let t = new Timestamp(1001)
        let actualResult = t.toSeconds()
        let expectedResult = 1
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('3456, return 3', () => {
        let t = new Timestamp(3456)
        let actualResult = t.toSeconds()
        let expectedResult = 3
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
