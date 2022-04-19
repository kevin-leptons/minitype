'use strict'

const assert = require('assert')
const {Result} = require('../../lib/result')
const {validateHeximal} = require('../../lib/validator')

describe('validator.validateHeximal', () => {
    it('not a string, return error', () => {
        let input = undefined
        let actualResult = validateHeximal(input)
        let expectedResult = Result.typeError('expect Heximal')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('has no prefix 0x, return error', () => {
        let input = '1ffb'
        let actualResult = validateHeximal(input)
        let expectedResult = Result.typeError('expect Heximal')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('even digits, return correct result', () => {
        let input = '0xffb'
        let actualResult = validateHeximal(input)
        let expectedResult = Result.ok()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('odd digits, return correct result', () => {
        let input = '0xffbc'
        let actualResult = validateHeximal(input)
        let expectedResult = Result.ok()
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('0x, return error', () => {
        let input = '0x'
        let actualResult = validateHeximal(input)
        let expectedResult = Result.typeError('expect Heximal')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
