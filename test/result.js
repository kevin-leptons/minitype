'use strict'

const assert = require('assert')
const {Result} = require('../lib')

describe('Result::error', () => {
    it('return an error result', () => {
        let error = 'this is an error'
        let actualResult = Result.error(error)
        let expectedResult = new Result(error, undefined)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
describe('Result::ok', () => {
    it('return data successfully', () => {
        let data = {one: 1}
        let actualResult = Result.ok(data)
        let expectedResult = new Result(undefined, data)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
