'use strict'

const {Result} = require('./result')
const {
    validateUInt, validateBigUInt, validateInstance
} = require('./validator')

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

    /**
     *
     * @param {string} value - A string follows data size pattern.
     * See examples for more details.
     * @return {Result<TypeError, DataSize>}
     * @example
     * DataSize.fromString('1') // 1 byte
     * DataSize.fromString('1.1KB') // 1.1 kilo byte
     * DataSize.fromString('1.1MB') // 1.1 mega byte
     * DataSize.fromString('1.1GB') // 1.1 giga byte
     * DataSize.fromString('1.1TB') // 1.1 tera byte
     * DataSize.fromString('1.1PB') // 1.1 peta byte
     * DataSize.fromString('1.1EB') // 1.1 exa byte
     * DataSize.fromString('1.1ZB') // 1.1 zetta byte
     * DataSize.fromString('1.1YB') // 1.1 yotta byte
     */
    static fromString(value) {
        let r1 = validateInstance(value, 'string')
        if (r1.error) {
            return r1
        }
        let pattern = /^([0-9]+)(.[0-9]+)?(B|KB|MB|GB|TB|PB|EB|ZB|YB)?$/
        let matched = value.match(pattern)
        if (matched === null) {
            return Result.typeError('expect data size string')
        }
        let [, integerStringPart, ratioStringPart, postfix] = matched
        let integerPart = BigInt(integerStringPart)
        let ratioPart = DataSize._parseRatioPart(ratioStringPart)
        let multiplier = DataSize._getPostfixMultiplier(postfix)
        let integerBytes = integerPart * multiplier
        let ratioBytes = ratioPart * multiplier / 10n
        let bytes = integerBytes + ratioBytes
        let instance = new DataSize(bytes)
        return Result.ok(instance)
    }

    /**
     * @return {Result<Error, number>}
     */
    toNumber() {
        if (this._value > 9007199254740991n) {
            let error = new Error('overflow unsigned integer 53 bits')
            return Result.error(error)
        }
        let instance = Number(this._value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {string} value
     * @return {bigint}
     */
    static _parseRatioPart(value) {
        if (value === undefined) {
            return 0n
        }
        let numberString = value.slice(1)
        return BigInt(numberString)
    }

    /**
     *
     * @param {string} postfix
     * @return {bigint}
     * @throws {TypeError}
     */
    static _getPostfixMultiplier(postfix) {
        switch (postfix) {
            case undefined: return 1n
            case 'B': return 1n
            case 'KB': return 1024n ** 1n
            case 'MB': return 1024n ** 2n
            case 'GB': return 1024n ** 3n
            case 'TB': return 1024n ** 4n
            case 'PB': return 1024n ** 5n
            case 'EB': return 1024n ** 6n
            case 'ZB': return 1024n ** 7n
            case 'YB': return 1024n ** 8n
            default: throw new TypeError('expect data size postfix')
        }
    }
}

module.exports = {
    DataSize
}
