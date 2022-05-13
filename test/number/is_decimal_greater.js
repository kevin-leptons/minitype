'use strict'

/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {_isDecimalGreater} = require('../../lib/number')

describe('number._private._isDecimalGreater', () => {
    it('length of operand1 > operand2, return true', () => {
        let operand1 = '900'
        let operand2 = '91'
        let expectedResult = true
        let actualResult = _isDecimalGreater(operand1, operand2)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('length of operand1 < operand2, return false', () => {
        let operand1 = '91'
        let operand2 = '900'
        let expectedResult = false
        let actualResult = _isDecimalGreater(operand1, operand2)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('operands has same length, operand1 < operand2, return false', () => {
        let operand1 = '800'
        let operand2 = '900'
        let expectedResult = false
        let actualResult = _isDecimalGreater(operand1, operand2)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('operands has same length, operand1 = operand2, return false', () => {
        let operand1 = '900'
        let operand2 = '900'
        let expectedResult = false
        let actualResult = _isDecimalGreater(operand1, operand2)
        assert.strictEqual(actualResult, expectedResult)
    })
    it('operands has same length, operand1 > operand2, return true', () => {
        let operand1 = '901'
        let operand2 = '900'
        let expectedResult = true
        let actualResult = _isDecimalGreater(operand1, operand2)
        assert.strictEqual(actualResult, expectedResult)
    })
})
