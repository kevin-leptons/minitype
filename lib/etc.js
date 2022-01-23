'use strict'

const {Result} = require('./result')
const {validateUInt, validateBigUInt} = require('./validator')

/**
 * Size of data.
 */
class DataSize {
    /**
     * Size of data in bytes.
     *
     * @type {bigint}
     */
    get value() {
        return this._value
    }

    /**
     *
     * **Tags:** `NO_INPUT_VALIDATION`.
     *
     * @param {bigint} value - Size of data in bytes.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @return {DataSize}
     */
    clone() {
        return new DataSize(this._value)
    }

    /**
     * Size in megabyte.
     *
     * @return {number}
     */
    format() {
        let {_value: v} = this
        if (v < 0x400n) {
            return v + 'B'
        }
        else if (v > 0x400n && v < 0x100000n) {
            return (v / 0x400n) + 'KB'
        }
        else {
            let megabytes = v / 0x100000n
            let kilobytes = (v - 0x100000n * megabytes) / 0x400n
            return megabytes + '.' + kilobytes + 'MB'
        }
    }

    /**
     *
     * @param {number} value
     * @return {Result<string, DataSize>}
     */
    static fromBytes(value) {
        let r = validateUInt(value)
        if (r.error) {
            return r
        }
        let bigint = BigInt(value)
        let data = new DataSize(bigint)
        return Result.ok(data)
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<string, DataSize>}
     */
    static fromBigInt(value) {
        let r = validateBigUInt(value)
        if (r.error) {
            return r
        }
        let bigint = BigInt(value)
        let data = new DataSize(bigint)
        return Result.ok(data)
    }

    /**
     *
     * @param {number} value
     * @return {Result<string, DataSize>}
     */
    static fromMegabytes(value) {
        let r = validateUInt(value)
        if (r.error) {
            return r
        }
        let bigint = 0x100000n * BigInt(value)
        let data = new DataSize(bigint)
        return Result.ok(data)
    }
}

module.exports = {
    DataSize
}
