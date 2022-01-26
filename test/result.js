'use strict'

const assert = require('assert')
const {Result} = require('../lib')

describe('Result.error', () => {
    it('return an error result', () => {
        let error = new Error('bad thing happend')
        let actualResult = Result.error(error)
        let expectedResult = new Result(error, undefined)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('Result.typeError', () => {
    it('return error which is instance of TypeError', () => {
        let message = 'bad type show up'
        let error = new TypeError('bad type show up')
        let actualResult = Result.typeError(message)
        let expectedResult = new Result(error, undefined)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('Result.ok', () => {
    it('return data successfully', () => {
        let data = {one: 1}
        let actualResult = Result.ok(data)
        let expectedResult = new Result(undefined, data)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
