'use strict'

/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {formatObject, Result} = require('../lib')

describe('formatObject', () => {
    it('target attribute name is not set, use source name', () => {
        let source = {
            numberString: '10',
            number: 11
        }
        let actions = [
            [
                'numberString', v => Result.ok(Number(v))
            ],
            [
                'number', v => Result.ok(v.toString())
            ]
        ]
        let expectedResult = Result.ok({
            numberString: 10,
            number: '11'
        })
        let actualResult = formatObject(source, actions)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('target attribute name is set, use it', () => {
        let source = {
            numberString: '10',
            number: 11
        }
        let actions = [
            [
                'numberString', v => Result.ok(Number(v)), 'number'
            ],
            [
                'number', v => Result.ok(v.toString()), 'string'
            ]
        ]
        let expectedResult = Result.ok({
            number: 10,
            string: '11'
        })
        let actualResult = formatObject(source, actions)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('formatter returns error, return attribute name and message', () => {
        let source = {}
        let actions = [
            [
                'numberString', () => Result.error('expect a number as string')
            ]
        ]
        let expectedResult = Result.error(
            'numberString: expect a number as string'
        )
        let actualResult = formatObject(source, actions)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
