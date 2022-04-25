'use strict'

const {Result} = require('./result')

class HttpEndpoint {
    /**
     * @type {URL}
     */
    get url() {
        return this._url
    }

    /**
     *
     * @param {URL} url
     */
    constructor(url) {
        this._url = url
    }

    /**
     *
     * @param {string} value
     * @return {Result<TypeError, HttpEndpoint>}
     */
    static fromString(value) {
        let r1 = parseUrl(value)
        if (r1.error) {
            return r1
        }
        let {data: url} = r1
        let {protocol} = url
        if (protocol !== 'http:' && protocol !== 'https:') {
            return Result.typeError('expect protocol http or https')
        }
        let instance = new HttpEndpoint(url)
        return Result.ok(instance)
    }
}

/**
 *
 * @param {string} value
 * @return {Result<TypeError, URL>}
 */
function parseUrl(value) {
    try {
        let url = new URL(value)
        return Result.ok(url)
    }
    catch {
        return Result.typeError('expect an URL')
    }
}

module.exports = {
    HttpEndpoint
}
