'use strict'

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const assert = require('assert')
const {Result, HttpEndpoint} = require('../../lib')

describe('type.HttpEndpoint.fromString', () => {
    it('not a string, return error', () => {
        let actualResult = HttpEndpoint.fromString(123)
        let expectedResult = Result.typeError('expect an URL')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('no protocol, return error', () => {
        let actualResult = HttpEndpoint.fromString('foo.bar')
        let expectedResult = Result.typeError('expect an URL')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('not protocol http or https , return error', () => {
        let actualResult = HttpEndpoint.fromString('httpx://foo.bar')
        let expectedResult = Result.typeError('expect protocol http or https')
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('protocol http, return correct result', () => {
        let urlString = 'http://foo.bar'
        let actualResult = HttpEndpoint.fromString(urlString)
        let expectedData = new HttpEndpoint(
            new URL(urlString)
        )
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('protocol https, return correct result', () => {
        let urlString = 'https://foo.bar'
        let actualResult = HttpEndpoint.fromString(urlString)
        let expectedData = new HttpEndpoint(
            new URL(urlString)
        )
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
    it('has basic authentication, query string, return correct result', () => {
        let urlString = 'https://zoo:jar@foo.bar?q=123'
        let actualResult = HttpEndpoint.fromString(urlString)
        let expectedData = new HttpEndpoint(
            new URL(urlString)
        )
        let expectedResult = Result.ok(expectedData)
        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
