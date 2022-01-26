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
     * @return {Result<TypeError, DataSize>}
     */
    static fromBytes(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = BigInt(value)
        let instance = new DataSize(bigint)
        return Result.ok(instance)
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<TypeError, DataSize>}
     */
    static fromBigInt(value) {
        let r1 = validateBigUInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = BigInt(value)
        let instance = new DataSize(bigint)
        return Result.ok(instance)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, DataSize>}
     */
    static fromMegabytes(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = 0x100000n * BigInt(value)
        let instance = new DataSize(bigint)
        return Result.ok(instance)
    }
}

module.exports = {
    DataSize
}
