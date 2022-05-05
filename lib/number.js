'use strict'

const {Result} = require('./result')
const {Decimal, Heximal} = require('./string')
const {
    validateUInt, validateHeximal, inspectHeximal, validateInstance,
    validateArrayItems, validatePInt
} = require('./validator')
const {
    decimalToUInt, heximalToUInt, toTidyUIntDecimal, toTidyPIntDecimal
} = require('./formatter')

const FORMATTER_LOCALE = 'en-US'
const UINT_256_MAX =
    0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn
/**
 * Transform a number or big number to string.
 *
 * @example
 * FORMATTER.format(1) // 1
 * FORMATTER.format(1234) // 1,234
 * FORMATTER.format(12345678) // 12,345,678
 */
const FORMATTER = new Intl.NumberFormat(FORMATTER_LOCALE)
/**
 * Transform a number or big number to string, minimum digits is 2.
 *
 * @example
 * FORMATTER_2.format(1) // 01
 * FORMATTER_2.format(12) // 12
 * FORMATTER_2.format(1234) // 1,234
 */
const FORMATTER_2 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 2
})
/**
 * Transform a number or big number to string, minimum digits is 3.
 *
 * @example
 * FORMATTER_3.format(1) // 001
 * FORMATTER_3.format(123) // 123
 * FORMATTER_3.format(1234) // 1,234
 */
const FORMATTER_3 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 3
})
/**
 * Transform a number or big number to string, minimum digits is 4.
 *
 * @example
 * FORMATTER_4.format(1) // 0,001
 * FORMATTER_4.format(1234) // 1,234
 * FORMATTER_4.format(12345) // 12,345
 */
const FORMATTER_4 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 4
})
/**
 * Transform a number or big number to string, minimum digits is 5.
 *
 * @example
 * FORMATTER_5.format(1) // 00,001
 * FORMATTER_5.format(12345) // 12,345
 * FORMATTER_5.format(123456) // 123,456
 */
const FORMATTER_5 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 5
})
/**
 * Transform a number or big number to string, minimum digits is 6.
 *
 * @example
 * FORMATTER_6.format(1) // 000,001
 * FORMATTER_6.format(123456) // 123,456
 * FORMATTER_6.format(1234567) // 1,234,567
 */
const FORMATTER_6 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 6
})
/**
 * Transform a number or big number to string, minimum digits is 7.
 *
 * @example
 * FORMATTER_7.format(1) // 0,000,001
 * FORMATTER_7.format(1234567) // 1,234,567
 * FORMATTER_7.format(12345678) // 12,345,678
 */
const FORMATTER_7 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 7
})
/**
 * Transform a number or big number to string, minimum digits is 7.
 *
 * @example
 * FORMATTER_8.format(1) // 00,000,001
 * FORMATTER_8.format(12345678) // 12,345,678
 * FORMATTER_8.format(123456789) // 123,456,789
 */
const FORMATTER_8 = new Intl.NumberFormat(FORMATTER_LOCALE, {
    minimumIntegerDigits: 8
})
/**
 * Transform a number or big number to string, minimum digits is 7.
 *
 * @example
 * FORMATTER_8.format(1) // 000,000,001
 * FORMATTER_8.format(123456789) // 123,456,789
 * FORMATTER_8.format(1234567891) // 1,234,567,891
 */
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
     * Initialize by {@link UInt.fromNumber}, {@link UInt.fromDecimal},
     * {@link UInt.fromHeximal}.
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
        let instance = new UInt(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, UInt>}
     */
    static fromDecimal(value) {
        let r1 = decimalToUInt(value)
        if (r1.error) {
            return r1
        }
        let instance = new UInt(r1.data)
        return Result.ok(instance)
    }

    /**
     * 53 bits all set heximal: `0x1fffffffffffff`.
     *
     * @param {Heximal} value
     * @return {Result<UInt>}
     */
    static fromHeximal(value) {
        let r1 = heximalToUInt(value)
        if (r1.error) {
            return r1
        }
        let instance = new UInt(r1.data)
        return Result.ok(instance)
    }

    /**
     *
     * @param {UInt} addend
     * @return {UInt}
     * @throws {TypeError}
     */
    add(addend) {
        validateInstance(addend, UInt).open()
        let sum = this._value + addend._value
        UInt._assertMathResult(sum)
        return new UInt(sum)
    }

    /**
     *
     * @param {UInt} subtrahend
     * @return {UInt}
     * @throws {TypeError}
     */
    sub(subtrahend) {
        validateInstance(subtrahend, UInt).open()
        let difference = this._value - subtrahend._value
        UInt._assertMathResult(difference)
        return new UInt(difference)
    }

    /**
     *
     * @param {UInt} multiplicand
     * @return {UInt}
     * @throws {TypeError}
     */
    mul(multiplicand) {
        validateInstance(multiplicand, UInt).open()
        let product = this._value * multiplicand._value
        UInt._assertMathResult(product)
        return new UInt(product)
    }

    /**
     *
     * @param {UInt} divisor
     * @return {UInt}
     * @throws {TypeError}
     */
    div(divisor) {
        validateInstance(divisor, UInt).open()
        if (divisor._value === 0) {
            throw new TypeError('divide by zero')
        }
        let remain = this._value % divisor._value
        let integer = (this._value - remain) / divisor._value
        return new UInt(integer)
    }

    /**
     *
     * @param {UInt} other
     * @return {boolean}
     * @throws {TypeError}
     */
    eq(other) {
        validateInstance(other, UInt).open()
        return this._value === other._value
    }

    /**
     *
     * @param {UInt} other
     * @return {boolean}
     * @throws {TypeError}
     */
    lt(other) {
        validateInstance(other, UInt).open()
        return this._value < other._value
    }

    /**
     *
     * @param {UInt} other
     * @return {boolean}
     * @throws {TypeError}
     */
    lte(other) {
        validateInstance(other, UInt).open()
        return this._value <= other._value
    }

    /**
     *
     * @param {UInt} other
     * @return {boolean}
     * @throws {TypeError}
     */
    gt(other) {
        validateInstance(other, UInt).open()
        return this._value > other._value
    }

    /**
     *
     * @param {UInt} other
     * @return {boolean}
     * @throws {TypeError}
     */
    gte(other) {
        validateInstance(other, UInt).open()
        return this._value >= other._value
    }

    /**
     * See {@link FORMATTER} for more details.
     *
     * @return {string}
     */
    format() {
        return FORMATTER.format(this._value)
    }

    /**
     * See {@link FORMATTER_2} for more details.
     *
     * @return {string}
     */
    format2() {
        return FORMATTER_2.format(this._value)
    }

    /**
     * See {@link FORMATTER_3} for more details.
     *
     * @return {string}
     */
    format3() {
        return FORMATTER_3.format(this._value)
    }

    /**
     * See {@link FORMATTER_4} for more details.
     *
     * @return {string}
     */
    format4() {
        return FORMATTER_4.format(this._value)
    }

    /**
     * See {@link FORMATTER_5} for more details.
     *
     * @return {string}
     */
    format5() {
        return FORMATTER_5.format(this._value)
    }

    /**
     * See {@link FORMATTER_6} for more details.
     *
     * @return {string}
     */
    format6() {
        return FORMATTER_6.format(this._value)
    }

    /**
     * See {@link FORMATTER_7} for more details.
     *
     * @return {string}
     */
    format7() {
        return FORMATTER_7.format(this._value)
    }

    /**
     * See {@link FORMATTER_8} for more details.
     *
     * @return {string}
     */
    format8() {
        return FORMATTER_8.format(this._value)
    }

    /**
     * See {@link FORMATTER_9} for more details.
     *
     * @return {string}
     */
    format9() {
        return FORMATTER_9.format(this._value)
    }

    /**
     * @private
     * @param {number} value
     * @throws {TypeError}
     */
    static _assertMathResult(value) {
        if (value < 0) {
            throw new TypeError('negative result')
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new TypeError('overflow unsigned integer 53 bits')
        }
    }
}

class UInt8 {
    /**
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     *
     * @param {number} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, UInt8>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value < 0) {
            return Result.typeError('expect a unsigned integer')
        }
        if (value > 0xff) {
            return Result.typeError('overflow unsigned integer 8 bits')
        }
        let instance = new UInt8(value)
        return Result.ok(instance)
    }

    /**
     * @param {Heximal} value
     * @return {Result<TypeError, UInt8>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 2) {
            return Result.typeError('overflow heximal 8 bits')
        }
        let number = Number(value, 16)
        let instance = new UInt8(number)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, UInt8>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (isDecimalGreater(decimal, '255')) {
            return Result.typeError('overflow decimal unsigned integer 8 bits')
        }
        let number = Number.parseInt(decimal, 10)
        let instance = new UInt8(number)
        return Result.ok(instance)
    }

    /**
     * @return {Heximal}
     */
    static toHeximal() {
        return '0x' + this._value.toString(16)
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
     * Initialize by {@link UInt16.fromNumber}, {@link UInt16.fromDecimal},
     * {@link UInt16.fromHeximal}.
     *
     * @param {number} value
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
        if (!Number.isInteger(value) || value < 0) {
            return Result.typeError('expect a unsigned integer')
        }
        if (value > 0xffff) {
            return Result.typeError('overflow unsigned integer 16 bits')
        }
        let instance = new UInt16(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, UInt16>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (isDecimalGreater(decimal, '65535')) {
            return Result.typeError('overflow decimal unsigned integer 16 bits')
        }
        let number = Number.parseInt(decimal, 10)
        let instance = new UInt16(number)
        return Result.ok(instance)
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
        if (length > 4) {
            return Result.typeError('overflow heximal 16 bits')
        }
        let number = Number(value, 16)
        let instance = new UInt16(number)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Buffer} value - 2 bytes.
     * @return {Result<TypeError, UInt16>}
     */
    static fromBuffer(value) {
        let r1 = validateInstance(value, Buffer)
        if (r1.error) {
            return r1
        }
        if (value.length === 0 || value.length > 2) {
            return Result.typeError('expect buffer 1-2 bytes')
        }
        let heximal = '0x' + value.toString('hex')
        let number = Number(heximal)
        let instance = new UInt16(number)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Buffer} value - 2 bytes.
     * @return {Result<TypeError, UInt16>}
     */
    static fromFixedBuffer(value) {
        let r1 = validateInstance(value, Buffer)
        if (r1.error) {
            return r1
        }
        if (value.length !== 2) {
            return Result.typeError('expect buffer 2 bytes')
        }
        let heximal = '0x' + value.toString('hex')
        let number = Number(heximal)
        let instance = new UInt16(number)
        return Result.ok(instance)
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
     * Initialize by {@link UInt32.fromNumber}, {@link UInt32.fromDecimal},
     * {@link UInt32.fromHeximal}.
     *
     * @param {value} value
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
        if (!Number.isInteger(value) || value < 0) {
            return Result.typeError('expect a unsigned integer')
        }
        if (value > 0xffffffff) {
            return Result.typeError('overflow unsigned integer 32 bits')
        }
        let instance = new UInt32(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, UInt32>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (isDecimalGreater(decimal, '4294967295')) {
            return Result.typeError('overflow decimal unsigned integer 32 bits')
        }
        let number = Number.parseInt(decimal, 10)
        let instance = new UInt32(number)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, UInt32>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 8) {
            return Result.typeError('overflow heximal 32 bits')
        }
        let number = Number(value, 16)
        let instance = new UInt32(number)
        return Result.ok(instance)
    }

    /**
     * See {@link FORMATTER} for more details.
     *
     * @return {string}
     */
    format() {
        return FORMATTER.format(this._value)
    }

    /**
     * See {@link FORMATTER_2} for more details.
     *
     * @return {string}
     */
    format2() {
        return FORMATTER_2.format(this._value)
    }

    /**
     * See {@link FORMATTER_3} for more details.
     *
     * @return {string}
     */
    format3() {
        return FORMATTER_3.format(this._value)
    }

    /**
     * See {@link FORMATTER_4} for more details.
     *
     * @return {string}
     */
    format4() {
        return FORMATTER_4.format(this._value)
    }

    /**
     * See {@link FORMATTER_5} for more details.
     *
     * @return {string}
     */
    format5() {
        return FORMATTER_5.format(this._value)
    }

    /**
     * See {@link FORMATTER_6} for more details.
     *
     * @return {string}
     */
    format6() {
        return FORMATTER_6.format(this._value)
    }

    /**
     * See {@link FORMATTER_7} for more details.
     *
     * @return {string}
     */
    format7() {
        return FORMATTER_7.format(this._value)
    }

    /**
     * See {@link FORMATTER_8} for more details.
     *
     * @return {string}
     */
    format8() {
        return FORMATTER_8.format(this._value)
    }

    /**
     * See {@link FORMATTER_9} for more details.
     *
     * @return {string}
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
     * Initialize by {@link UInt64.fromNumber}, {@link UInt64.fromBigInt},
     * {@link UInt64.fromDecimal}, {@link UInt64.fromHeximal}.
     *
     * @param {bigint} value - Big, unsigned integer number, 64 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value - Maximum input value is unsigned integer 53 bits
     * `0x1fffffffffffff`.
     * @return {Result<TypeError, UInt64>}
     */
    static fromNumber(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = BigInt(value)
        let instance = new UInt64(bigint)
        return Result.ok(instance)
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
        if (value > 0xffffffffffffffffn) {
            return Result.typeError('overflow unsigned integer 64 bits')
        }
        let instance = new UInt64(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, UInt64>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (isDecimalGreater(decimal, '18446744073709551615')) {
            return Result.typeError('overflow decimal unsigned integer 64 bits')
        }
        let number = BigInt(decimal, 10)
        let instance = new UInt64(number)
        return Result.ok(instance)
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
            return Result.typeError('overflow heximal 64 bits')
        }
        let number = BigInt(value)
        let instance = new UInt64(number)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Buffer} value - 1 to 8 bytes.
     * @return {Result<TypeError, UInt64>}
     */
    static fromBuffer(value) {
        let r1 = validateInstance(value, Buffer)
        if (r1.error) {
            return r1
        }
        if (value.length <= 0 || value.length > 8) {
            return Result.typeError('expect buffer 1-8 bytes')
        }
        let heximal = '0x' + value.toString('hex')
        let number = BigInt(heximal)
        let instance = new UInt64(number)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Buffer} value - 8 bytes.
     * @return {Result<TypeError, UInt64>}
     */
    static fromFixedBuffer(value) {
        let r1 = validateInstance(value, Buffer)
        if (r1.error) {
            return r1
        }
        if (value.length !== 8) {
            return Result.typeError('expect buffer 8 bytes')
        }
        let heximal = '0x' + value.toString('hex')
        let number = BigInt(heximal)
        let instance = new UInt64(number)
        return Result.ok(instance)
    }

    /**
     * Return `true` if this number is less than `other`.
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
     * Return `true` if this number is less than or equal `other`.
     *
     * @param {UInt64} other
     * @return {boolean}
     * @throws {TypeError}
     */
    lte(other) {
        validateInstance(other, UInt64).open()
        return this._value <= other._value
    }

    /**
     * Return `true` if this number is greater than `other`.
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
     * Return `true` if this number is greater than or equal `other`.
     *
     * @param {UInt64} other
     * @return {boolean}
     * @throws {TypeError}
     */
    gte(other) {
        validateInstance(other, UInt64).open()
        return this._value >= other._value
    }

    /**
     * Return `this + addend`.
     *
     * @param {UInt64} addend
     * @return {UInt64}
     * @throws {TypeError}
     */
    add(addend) {
        validateInstance(addend, UInt64).open()
        let sum = this._value + addend._value
        UInt64._assertMathResult(sum)
        return new UInt64(sum)
    }

    /**
     * Return `this - subtrahend`.
     *
     * @param {UInt64} subtrahend
     * @return {UInt64}
     * @throws {TypeError}
     */
    sub(subtrahend) {
        validateInstance(subtrahend, UInt64).open()
        let difference = this._value - subtrahend._value
        UInt64._assertMathResult(difference)
        return new UInt64(difference)
    }

    /**
     * Return `this * multiplicand`.
     *
     * @param {UInt64} multiplicand
     * @return {UInt64}
     * @throws {TypeError}
     */
    mul(multiplicand) {
        validateInstance(multiplicand, UInt64).open()
        let product = this._value * multiplicand._value
        UInt64._assertMathResult(product)
        return new UInt64(product)
    }

    /**
     * Return `this / divisor`, result is integer part.
     *
     * @param {UInt64} divisor
     * @return {UInt64}
     * @throws {TypeError}
     */
    div(divisor) {
        validateInstance(divisor, UInt64).open()
        let integer = this._value / divisor._value
        UInt64._assertMathResult(integer)
        return new UInt64(integer)
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
        UInt64._assertMathResult(sum)
        return new UInt64(sum)
    }

    /**
     *
     * @param {PInt64} addend
     * @return {UInt64}
     * @throws {TypeError}
     */
    addPInt64(addend) {
        validateInstance(addend, PInt64)
        let sum = this._value + addend._value
        UInt64._assertMathResult(sum)
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
        UInt64._assertMathResult(difference)
        return new UInt64(difference)
    }

    /**
     * @return {UInt64}
     */
    clone() {
        return new UInt64(this._value)
    }

    /**
     * @return {number}
     * @throws {Error}
     */
    toNumber() {
        if (this._value > Number.MAX_SAFE_INTEGER) {
            throw new Error('overflow unsigned integer 53 bits')
        }
        return Number(this._value)
    }

    /**
     *
     * @return {Heximal}
     */
    toHeximal() {
        return '0x' + this._value.toString(16)
    }

    /**
     * See {@link FORMATTER} for more details.
     *
     * @return {string}
     */
    format() {
        return FORMATTER.format(this._value)
    }

    /**
     * See {@link FORMATTER_2} for more details.
     *
     * @return {string}
     */
    format2() {
        return FORMATTER_2.format(this._value)
    }

    /**
     * See {@link FORMATTER_3} for more details.
     *
     * @return {string}
     */
    format3() {
        return FORMATTER_3.format(this._value)
    }

    /**
     * See {@link FORMATTER_4} for more details.
     *
     * @return {string}
     */
    format4() {
        return FORMATTER_4.format(this._value)
    }

    /**
     * See {@link FORMATTER_5} for more details.
     *
     * @return {string}
     */
    format5() {
        return FORMATTER_5.format(this._value)
    }

    /**
     * See {@link FORMATTER_6} for more details.
     *
     * @return {string}
     */
    format6() {
        return FORMATTER_6.format(this._value)
    }

    /**
     * See {@link FORMATTER_7} for more details.
     *
     * @return {string}
     */
    format7() {
        return FORMATTER_7.format(this._value)
    }

    /**
     * See {@link FORMATTER_8} for more details.
     *
     * @return {string}
     */
    format8() {
        return FORMATTER_8.format(this._value)
    }

    /**
     * See {@link FORMATTER_9} for more details.
     *
     * @return {string}
     */
    format9() {
        return FORMATTER_9.format(this._value)
    }

    /**
     *
     * @param {...UInt64} values
     * @return {UInt64}
     * @throws {TypeError}
     */
    static min(...values) {
        validateArrayItems(values, UInt64, 1).open()
        let minimum = values[0]
        for (let v of values) {
            if (v._value < minimum._value) {
                minimum = v
            }
        }
        return minimum
    }

    /**
     * @private
     * @param {bigint} value
     * @throws {TypeError}
     */
    static _assertMathResult(value) {
        if (value < 0n) {
            throw new TypeError('negative result')
        }
        if (value > 0xffffffffffffffffn) {
            throw new TypeError('overflow unsigned integer 64 bits')
        }
    }
}

class PInt {
    /**
     * Positive integer, 53 bits.
     *
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * Initialize by {@link PInt.fromNumber}, {@link PInt.fromDecimal}.
     *
     * @param {number} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, PInt>}
     */
    static fromNumber(value) {
        let r1 = validatePInt(value)
        if (r1.error) {
            return r1
        }
        let instance = new PInt(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, PInt>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (decimal === '0') {
            return Result.typeError('expect a decimal of positive integer')
        }
        if (isDecimalGreater(decimal, '9007199254740991')) {
            return Result.typeError(
                'overflow decimal positive integer 53 bits'
            )
        }
        let number = Number(decimal, 10)
        let instance = new PInt(number)
        return Result.ok(instance)
    }
}

/**
 * Positive integer number, 64 bits.
 */
class PInt64 {
    /**
     * Positive integer, 64 bits.
     *
     * @type {bigint}
     */
    get value() {
        return this._value
    }

    /**
     * Initialize by {@link PInt64.fromNumber}, {@link PInt64.fromBigInt},
     * {@link PInt64.fromDecimal}, {@link PInt64.fromHeximal}.
     *
     * @param {bigint} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value - Maximum input value is unsigned integer 53 bits
     * `0x1fffffffffffff`.
     * @return {Result<TypeError, PInt64>}
     */
    static fromNumber(value) {
        if (!Number.isInteger(value) || value <= 0) {
            return Result.typeError('expect a positive integer')
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            return Result.typeError('overflow unsigned integer 53 bits')
        }
        let bigint = BigInt(value)
        let instance = new PInt64(bigint)
        return Result.ok(instance)
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
            return Result.typeError('expect a big positive integer')
        }
        if (value > 0xffffffffffffffffn) {
            return Result.typeError('overflow positive integer 64 bits')
        }
        let instance = new PInt64(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, PInt64>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (decimal === '0') {
            return Result.typeError(
                'expect a decimal, positive integer 64 bits'
            )
        }
        if (isDecimalGreater(decimal, '18446744073709551615')) {
            return Result.typeError(
                'overflow decimal, positive integer 64 bits'
            )
        }
        let number = BigInt(decimal, 10)
        let instance = new PInt64(number)
        return Result.ok(instance)
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
        let instance = new PInt64(number)
        return Result.ok(instance)
    }
}

class PInt256 {
    /**
     * Maximum value.
     *
     * @readonly
     * @type {bigint}
     */
    static _MAX = 2n ** 256n - 1n

    /**
     * @readonly
     * @type {string}
     */
    static _MAX_DECIMAL = '115792089237316195423570985008687907853' +
        '269984665640564039457584007913129639935'

    /**
     * Positive, integer, 256 bits number.
     *
     * @type {bigint}
     */
    get value() {
        return this._value
    }

    /**
     *
     * @param {bigint} value - Positive, integer, 256 bits number.
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, PInt256>}
     */
    static fromNumber(value) {
        let r1 = validatePInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = BigInt(value)
        let instance = new PInt256(bigint)
        return Result.ok(instance)
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<TypeError, PInt256>}
     */
    static fromBigInt(value) {
        let r1 = validateInstance(value, 'bigint')
        if (r1.error) {
            return r1
        }
        if (value <= 0) {
            return Result.typeError('expect big positive integer')
        }
        if (value > PInt256._MAX) {
            return Result.typeError('overflow positive integer 256 bits')
        }
        let instance = new PInt256(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, PInt256>}
     */
    static fromDecimal(value) {
        let r1 = toTidyPIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (isDecimalGreater(decimal, PInt256._MAX_DECIMAL)) {
            return Result.typeError(
                'overflow decimal positive integer 256 bits'
            )
        }
        let bigint = BigInt(decimal)
        let instance = new PInt256(bigint)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, PInt256>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 64) {
            return Result.typeError('overflow heximal 256 bits')
        }
        let number = BigInt(value)
        if (number <= 0) {
            return Result.typeError('expect a positive integer from heximal')
        }
        let instance = new PInt256(number)
        return Result.ok(instance)
    }

    /**
     * @return {Decimal}
     */
    toDecimal() {
        return this._value.toString(10)
    }

    /**
     * @return {Heximal}
     */
    toHeximal() {
        return '0x' + this._value.toString(16)
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

class UInt256 {
    /**
     * Maximum value.
     *
     * @readonly
     * @type {bigint}
     */
    static _MAX = 2n ** 256n - 1n

    /**
     * @readonly
     * @type {string}
     */
    static _MAX_DECIMAL = '115792089237316195423570985008687907853' +
                          '269984665640564039457584007913129639935'

    /**
     * @type {bigint}
     */
    get value() {
        return this._value
    }

    /**
     *
     * @param {bigint} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, UInt256>}
     */
    static fromNumber(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let bigint = BigInt(value)
        let instance = new UInt256(bigint)
        return Result.ok(instance)
    }

    /**
     *
     * @param {bigint} value
     * @return {Result<TypeError, UInt256>}
     */
    static fromBigInt(value) {
        let r1 = validateInstance(value, 'bigint')
        if (r1.error) {
            return r1
        }
        if (value < 0) {
            return Result.typeError('expect big unsigned integer')
        }
        if (value > UInt256._MAX) {
            return Result.typeError('overflow unsigned integer 256 bits')
        }
        let instance = new UInt256(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Decimal} value
     * @return {Result<TypeError, UInt256>}
     */
    static fromDecimal(value) {
        let r1 = toTidyUIntDecimal(value)
        if (r1.error) {
            return r1
        }
        let {data: decimal} = r1
        if (isDecimalGreater(decimal, UInt256._MAX_DECIMAL)) {
            return Result.typeError(
                'overflow decimal unsigned integer 256 bits'
            )
        }
        let bigint = BigInt(decimal)
        let instance = new UInt256(bigint)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, UInt256>}
     */
    static fromHeximal(value) {
        let r1 = validateHeximal(value)
        if (r1.error) {
            return r1
        }
        let [length] = inspectHeximal(value)
        if (length > 64) {
            return Result.typeError('overflow heximal 256 bits')
        }
        let number = BigInt(value)
        let instance = new UInt256(number)
        return Result.ok(instance)
    }

    /**
     * @return {boolean}
     */
    isZero() {
        return this._value === 0n
    }

    /**
     *
     * @param {UInt256} other
     * @return {UInt256}
     * @throws {RangeError}
     */
    add(other) {
        validateInstance(other, UInt256).open()
        let value = this._value + other._value
        if (value > UINT_256_MAX) {
            throw new RangeError('overflow result')
        }
        return new UInt256(value)
    }

    /**
     *
     * @param {UInt256} other
     * @return {UInt256}
     * @throws {RangeError}
     */
    sub(other) {
        validateInstance(other, UInt256).open()
        let value = this._value - other._value
        if (value < 0) {
            throw new RangeError('expect unsigned result')
        }
        return new UInt256(value)
    }

    /**
     *
     * @param {UInt256} other
     * @return {boolean}
     * `true` - This number is equal `other`.
     * `false` - This number is not equal `other`.
     */
    eq(other) {
        validateInstance(other, UInt256).open()
        return this._value === other._value
    }

    /**
     *
     * @param {UInt256} other
     * @return {boolean}
     * `true` - This number is less than `other`.
     * `false` - This number is greater than or equal `other`.
     */
    lt(other) {
        validateInstance(other, UInt256).open()
        return this._value < other._value
    }

    /**
     *
     * @param {UInt256} other
     * @return {boolean}
     * `true` - This number is greater than `other`.
     * `false` - This number is less than or equal `other`.
     */
    gt(other) {
        validateInstance(other, UInt256).open()
        return this._value > other._value
    }

    /**
     * @return {Decimal}
     */
    toDecimal() {
        return this._value.toString(10)
    }

    /**
     * @return {Heximal}
     */
    toHeximal() {
        return '0x' + this._value.toString(16)
    }
}

/**
 * **Tags:** NO_INPUT_VALIDATION.
 *
 * Input must be decimal string, has at least a digit.
 *
 * @param {string} operand1
 * @param {string} operand2
 * @return {boolean} `true` if `operand1 > operand2`.
 * @example
 * isDecimalGreater('2', '1') // => true
 * isDecimalGreater('2', '2') // => false
 * isDecimalGreater('2', '3') // => false
 * isDecimalGreater('91', '900') // => false
 */
function isDecimalGreater(operand1, operand2) {
    if (operand1.length > operand2.length) {
        return true
    }
    else if (operand1.length < operand2.length) {
        return false
    }
    else {
        return operand1 > operand2
    }
}

module.exports = {
    UInt,
    UInt8,
    UInt16,
    UInt32,
    UInt64,
    UInt256,
    PInt,
    PInt64,
    PInt256,
    Float64,
    UFloat64,
    _private: {
        FORMATTER,
        FORMATTER_2,
        FORMATTER_3,
        FORMATTER_4,
        FORMATTER_5,
        FORMATTER_6,
        FORMATTER_7,
        FORMATTER_8,
        FORMATTER_9,
        isDecimalGreater
    }
}
