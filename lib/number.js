'use strict'

const {Result} = require('./result')
const {Heximal} = require('./string')
const {
    validateUInt, validateHeximal, inspectHeximal, validateInstance
} = require('./validator')
const {heximalToUInt} = require('./formatter')

const FORMATTER_LOCALE = 'en-US'
const FORMATTER_2 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 2
})
const FORMATTER_3 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 3
})
const FORMATTER_4 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 4
})
const FORMATTER_5 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 5
})
const FORMATTER_6 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 6
})
const FORMATTER_7 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 7
})
const FORMATTER_8 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 8
})
const FORMATTER_9 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 9
})

/**
 * Unsigned integer number, 53 bits.
 */
class UInt {
    /**
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {number} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, UInt>}
     */
    static fromNumber(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let data = new UInt(value)
        return Result.ok(data)
    }

    /**
     * 53 bits all set heximal: `0x1FFFFFFFFFFFFF`.
     *
     * @param {Heximal} value
     * @return {Result<UInt>}
     */
    static fromHeximal(value) {
        let r1 = heximalToUInt(value)
        if (r1.error) {
            return r1
        }
        let {data: number} = r1
        let data = new UInt(number)
        return Result.ok(data)
    }
}

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
     * @return {Result<TypeError, UInt16>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0 || value > 0xffff) {
            return Result.typeError('expect unsigned integer 16 bits')
        }
        let data = new UInt16(value)
        return Result.ok(data)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<UInt16>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 4) {
            return Result.typeError('heximal overflow 16 bits')
        }
        let number = Number(value, 16)
        let data = new UInt16(number)
        return Result.ok(data)
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
     * @return {Result<TypeError, UInt32>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) {
            return Result.typeError('expect unsigned integer 32 bits')
        }
        let data = new UInt32(value)
        return Result.ok(data)
    }

    /**
     * Return string that has at least 2 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(1).open()
     * n1.format2() // => 01
     */
    format2() {
        return FORMATTER_2.format(this._value)
    }

    /**
     * Return string that has at least 3 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(1).open()
     * n1.format3() // => 001
     */
    format3() {
        return FORMATTER_3.format(this._value)
    }

    /**
     * Return string that has at least 4 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format4() // => 0,123
     */
    format4() {
        return FORMATTER_4.format(this._value)
    }

    /**
     * Return string that has at least 5 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format5() // => 00,123
     */
    format5() {
        return FORMATTER_5.format(this._value)
    }

    /**
     * Return string that has at least 6 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format6() // => 000,123
     */
    format6() {
        return FORMATTER_6.format(this._value)
    }

    /**
     * Return string that has at least 7 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format7() // => 000,123
     */
    format7() {
        return FORMATTER_7.format(this._value)
    }

    /**
     * Return string that has at least 8 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format8() // => 00,000,123
     */
    format8() {
        return FORMATTER_8.format(this._value)
    }

    /**
     * Return string that has at least 9 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format9() // => 000,000,123
     */
    format9() {
        return FORMATTER_9.format(this._value)
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
     * If this number is less than `other` then return `true`.
     *
     * @param {UInt64} other
     * @return {boolean}
     * @throws {TypeError}
     */
    lt(other) {
        validateInstance(other, UInt64).open()
        return this._value < other._value
    }

    /**
     * If this number is greater than `other` then return `true.
     *
     * @param {UInt64} other
     * @return {boolean}
     * @throws {TypeError}
     */
    gt(other) {
        validateInstance(other, UInt64).open()
        return this._value > other._value
    }

    /**
     * Return additional of this number and `addend`.
     *
     * @param {UInt64} addend
     * @return {UInt64}
     * @throws {TypeError}
     */
    add(addend) {
        validateInstance(addend, UInt64).open()
        let sum = this._value + addend._value
        UInt64._validateOverflow(sum).open()
        return new UInt64(sum)
    }

    /**
     *
     * @param {UInt64} subtrahend
     * @return {UInt64}
     * @throws {TypeError}
     */
    sub(subtrahend) {
        validateInstance(subtrahend, UInt64).open()
        let difference = this._value - subtrahend._value
        if (difference < 0) {
            throw new TypeError('negative result')
        }
        return new UInt64(difference)
    }

    /**
     *
     * @param {number} addend
     * @return {UInt64}
     * @throws {TypeError}
     */
    addNumber(addend) {
        validateUInt(addend).open()
        let sum = this._value + BigInt(addend)
        UInt64._validateOverflow(sum).open()
        return new UInt64(sum)
    }

    /**
     *
     * @param {number} subtrahend
     * @return {UInt64}
     * @throws {TypeError}
     */
    subNumber(subtrahend) {
        validateUInt(subtrahend).open()
        let difference = this._value - BigInt(subtrahend)
        if (difference < 0) {
            throw new TypeError('negative result')
        }
        return new UInt64(difference)
    }

    /**
     * @return {UInt64}
     */
    clone() {
        return new UInt64(this._value)
    }

    /**
     * @return {string}
     */
    format() {
        return this._value.toLocaleString()
    }

    /**
     * Return string that has at least 2 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(1).open()
     * n1.format2() // => 01
     */
    format2() {
        return FORMATTER_2.format(this._value)
    }

    /**
     * Return string that has at least 3 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(1).open()
     * n1.format3() // => 001
     */
    format3() {
        return FORMATTER_3.format(this._value)
    }

    /**
     * Return string that has at least 4 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format4() // => 0,123
     */
    format4() {
        return FORMATTER_4.format(this._value)
    }

    /**
     * Return string that has at least 5 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format5() // => 00,123
     */
    format5() {
        return FORMATTER_5.format(this._value)
    }

    /**
     * Return string that has at least 6 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format6() // => 000,123
     */
    format6() {
        return FORMATTER_6.format(this._value)
    }

    /**
     * Return string that has at least 7 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format7() // => 000,123
     */
    format7() {
        return FORMATTER_7.format(this._value)
    }

    /**
     * Return string that has at least 8 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format8() // => 00,000,123
     */
    format8() {
        return FORMATTER_8.format(this._value)
    }

    /**
     * Return string that has at least 9 digits.
     *
     * @return {string}
     * @example
     * let n1 = UInt64.fromNumber(123).open()
     * n1.format9() // => 000,000,123
     */
    format9() {
        return FORMATTER_9.format(this._value)
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<TypeError, UInt64>}
     */
    static fromBigInt(value) {
        let r1 = validateInstance(value, 'bigint')
        if (r1.error) {
            return r1
        }
        if (value < 0) {
            return Result.typeError('expect unsigned big integer')
        }
        let r2 = UInt64._validateOverflow(value)
        if (r2.error) {
            return r2
        }
        let data = new UInt64(value)
        return Result.ok(data)
    }

    /**
     *
     * @return {Heximal}
     */
    toHeximal() {
        return '0x' + this._value.toString(16)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, UInt64>}
     */
    static fromNumber(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = BigInt(value)
        let data = new UInt64(bigint)
        return Result.ok(data)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, UInt16>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 16) {
            return Result.typeError('heximal overflow 64 bits')
        }
        let number = BigInt(value)
        let data = new UInt64(number)
        return Result.ok(data)
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<TypeError, undefined>}
     */
    static _validateOverflow(value) {
        if (value > 0xffffffffffffffffn) {
            return Result.typeError('overflow unsigned integer 64 bits')
        }
        return Result.ok()
    }
}

/**
 * Possitive integer number, 64 bits.
 */
class PInt64 {
    /**
     * Unsigned integer, 64 bits.
     *
     * @type {bigint}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {bigint} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<TypeError, PInt64>}
     */
    static fromBigInt(value) {
        if (
            typeof(value) !== 'bigint' ||
            value <= 0
        ) {
            return Result.typeError('expect a big possitive integer')
        }
        if (value > 0xffffffffffffffffn) {
            return Result.typeError('overflow possitive integer 64 bits')
        }
        let data = new PInt64(value)
        return Result.ok(data)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, PInt64>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 16) {
            return Result.typeError('overflow heximal 64 bits')
        }
        let number = BigInt(value)
        let data = new UInt64(number)
        return Result.ok(data)
    }
}

class Float64 {
    /**
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {number} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Float64>}
     */
    static fromNumber(value) {
        if (typeof(value) !== 'number') {
            return Result.typeError('expect a number')
        }
        if (value >= Infinity) {
            return Result.typeError('overflow float number 64 bits')
        }
        let data = new Float64(value)
        return Result.ok(data)
    }
}

class UFloat64 {
    /**
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {number} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, UFloat64>}
     */
    static fromNumber(value) {
        if (typeof(value) !== 'number' || value < 0) {
            return Result.typeError('expect a unsigned number')
        }
        if (value >= Infinity) {
            return Result.typeError('overflow float number 64 bits')
        }
        let data = new UFloat64(value)
        return Result.ok(data)
    }
}

module.exports = {
    UInt,
    UInt16,
    UInt32,
    UInt64,
    PInt64,
    Float64,
    UFloat64
}
