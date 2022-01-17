'use strict'

const {Result} = require('./result')

class Timestamp {
    /**
     * Timestamp in miliseconds.
     *
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {number} value - Timestamp in miliseconds, unsigned
     * integer number, 53 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value - Timestamp in miliseconds.
     * @return {Result<string, Timestamp>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0) {
            return Result.error('expect unsigned integer')
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            return Result.error('overflow native unsigned integer 53 bits')
        }
        return new Timestamp(value)
    }
}

class Timespan {
    /**
     * Timespan in miliseconds.
     *
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {value} value - Timespan in miliseconds, unsigned
     * integer number, 53 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value - Timespan in miliseconds.
     * @return {Result<string, Timespan>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0) {
            return Result.error('expect unsigned integer')
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            return Result.error('overflow native unsigned integer 53 bits')
        }
        return new Timespan(value)
    }
}

module.exports = {
    Timestamp,
    Timespan
}
