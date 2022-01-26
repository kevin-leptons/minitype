'use strict'

const {Result} = require('./result')
const {validateInstance} = require('./validator')

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
     * @return {Result<TypeError, TidyString>}
     */
    static fromString(value) {
        let r1 = validateInstance(value, 'string')
        if (r1.error) {
            return r1
        }
        let tidyString = value.trim()
        if (tidyString.length === 0) {
            return Result.typeError('expect a non empty string')
        }
        let instance = new TidyString(tidyString)
        return Result.ok(instance)
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
     * @return {Result<TypeError, LowerTidyString>}
     */
    static fromString(value) {
        let r1 = validateInstance(value, 'string')
        if (r1.error) {
            return r1
        }
        let tidyString = value.trim().toLowerCase()
        if (tidyString.length === 0) {
            return Result.typeError('expect a non empty string')
        }
        let instance = new LowerTidyString(tidyString)
        return Result.ok(instance)
    }
}

module.exports = {
    TidyString,
    LowerTidyString
}
