'use strict'

const {Result} = require('./result')

/**
 * A string which is: Has no spaces at begin or end; Has no two spaces at
 * middle; Has at least a symbol.
 */
class TidyString {
    /**
     *
     * @return {string}
     */
    value() {
        return this._value
    }

    /**
     * **Tags:** `NO_INPUT_VALIDATION`.
     *
     * @param {string} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {string} value
     * @return {Result<string, TidyString>}
     */
    static fromString(value) {
        if (typeof(value) !== 'string') {
            return Result.typeError('expect a non empty string')
        }
        let standardValue = value.trim()
        if (standardValue.length === 0) {
            return Result.typeError('expect a non empty string')
        }
        let data = new TidyString(standardValue)
        return Result.ok(data)
    }
}

/**
 * A string which is a `TidyString` and all symbols is lowercase.
 *
 */
class LowerTidyString {
    /**
     *
     * @return {string}
     */
    value() {
        return this._value
    }

    /**
     * **Tags:** `NO_INPUT_VALIDATION`.
     *
     * @param {string} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     * @param {string} value - Will be convert to lowercase.
     * @return {Result<string, LowerTidyString>}
     */
    static fromString(value) {
        if (typeof(value) !== 'string') {
            return Result.typeError('expect a non empty string')
        }
        let standardValue = value.trim().toLowerCase()
        if (standardValue.length === 0) {
            return Result.typeError('expect a non empty string')
        }
        let data = new LowerTidyString(standardValue)
        return Result.ok(data)
    }
}

module.exports = {
    TidyString,
    LowerTidyString
}
