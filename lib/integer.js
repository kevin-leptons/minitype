'use strict'

const {Result} = require('./result')

class UInt16 {
    /**
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {value} value - Unsigned integer number, 16 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<string, UInt16>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0 || value > 0xffff) {
            return Result.error('expect unsigned integer 16 bits')
        }
        return new UInt16(value)
    }
}

class UInt32 {
    /**
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {value} value - Unsigned integer number, 32 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<string, UInt32>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) {
            return Result.error('expect unsigned integer 32 bits')
        }
        return new UInt32(value)
    }
}

class UInt64 {
    /**
     * @type {bigint}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {bigint} value - Big, unsigned integer number, 64 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<string, UInt64>}
     */
    static fromBigInt(value) {
        if (typeof(value) !== 'bigint' || value < 0) {
            return Result.error('expect unsigned big integer')
        }
        return new UInt64(value)
    }
}

module.exports = {
    UInt16,
    UInt32,
    UInt64
}
