'use strict'

const {Result} = require('./result')
const {Decimal, Heximal, HeximalByteArray} = require('./primitive')
const {
    validateHeximal,
    validateHeximalByteArray,
    validateUIntDecimal,
    validatePIntDecimal,
    inspectHeximal,
    validateObject,
    validateArray
} = require('./validator')

/**
 * Transform heximal to 53 bits unsigned integer number.
 *
 * @param {Heximal} value
 * @return {Result<TypeError, number>}
 */
function heximalToUInt(value) {
    let r1 = validateHeximal(value)
    if (r1.error) {
        return r1
    }
    let [length, digit] = inspectHeximal(value)
    if (
        (length > 14) ||
        (length === 14 && digit > '1')
    ) {
        return Result.typeError('overflow heximal 53 bits')
    }
    let number = Number(value, 16)
    return Result.ok(number)
}

/**
 *
 * @param {HeximalByteArray} value
 * @return {Result<TypeError, Buffer>}
 */
function heximalToBuffer(value) {
    let r1 = validateHeximalByteArray(value)
    if (r1.error) {
        return r1
    }
    let noPrefixHeximal = value.slice(2)
    let heximal = (noPrefixHeximal.length % 2 === 0)
        ? noPrefixHeximal
        : '0' + noPrefixHeximal
    let instance = Buffer.from(heximal, 'hex')
    return Result.ok(instance)
}

/**
 * @typedef {Function} Formatter
 * @function
 * @param {any} source
 * @return {Result<TypeError, any>}
 */

/**
 * `[0]` is name of attribute from source object. `[1]` is format function.
 * `[2]` is name of attribute in target object, `undefined` mean keep the
 * same attribute name from source object.
 *
 * @typedef {Array<string, Formatter, undefined | string>} MapObjectAction
 */

/**
 * **Tags**: `PARTIAL_INPUT_VALIDATION`.
 *
 * @param {object} source
 * @param {Array<MapObjectAction>} actions - This input is not validate.
 * @return {Result<TypeError, object>}
 * @example
 * let source = {one: '1'}
 *
 * // Transform data only.
 * mapObject(source, [
 *     ['one', v => PInt.fromDecimal]
 * ])
 *
 * // Transform data and change attribute name `one` to `two`.
 * mapObject(souce, [
 *     ['one', v => PInt.fromDecimal, 'two']
 * ])
 *
 * // Set default value.
 * mapObject(source, [
 *     ['one', v => PInt.fromDecimal(v || '1')]
 * ])
 *
 * // Keep data no changes.
 * mapObject(source, [
 *     ['one', v => Result.ok(v)]
 * ])
 */
function mapObject(source, actions) {
    let r1 = validateObject(source)
    if (r1.error) {
        return r1
    }
    let target = {}
    for (let i = 0; i < actions.length; ++i) {
        let [sourceAttribute, formatter, targetAttribute] = actions[i]
        let sourceValue = source[sourceAttribute]
        let {error, data: targetValue} = formatter(sourceValue)
        if (error) {
            return Result.typeError(`${sourceAttribute}: ${error.message}`)
        }
        targetAttribute = targetAttribute || sourceAttribute
        target[targetAttribute] = targetValue
    }
    return Result.ok(target)
}

/**
 * **Tags**: `PARTIAL_INPUT_VALIDATION`.
 *
 * @param {Array<any>} source
 * @param {Formatter} formatter - This input is not validate.
 * @return {Array<Result<TypeError, Array>>}
 * @example
 * let source = [1, 2, 3]
 * let target = mapArray(source, v => {
 *     return Result.ok(v.toString())
 * })
 */
function mapArray(source, formatter) {
    let r1 = validateArray(source)
    if (r1.error) {
        return r1
    }
    let target = []
    for (let i = 0; i < source.length; ++i) {
        let r2 = formatter(source[i])
        if (r2.error) {
            return Result.typeError(`[${i}]: ${r2.error.message}`)
        }
        target.push(r2.data)
    }
    return Result.ok(target)
}

/**
 * @param {string} value
 * @return {Result<TypeError, string>}
 */
function toLowerTidyString(value) {
    if (typeof(value) !== 'string') {
        return Result.typeError('expect a non empty string')
    }
    let output = value.trim().toLowerCase()
    if (output.length === 0) {
        return Result.typeError('expect a non empty string')
    }
    return Result.ok(output)
}

/**
 * Convert decimal string to unsigned integer number, 53 bits.
 *
 * @param {Decimal} value
 * @return {Result<TypeError, number>}
 */
function decimalToUInt(value) {
    let uintRegex = /^[0-9]+$/
    if (uintRegex.test(value) === false) {
        return Result.typeError('expect a unsigned integer decimal')
    }
    let number = Number.parseInt(value)
    if (number > Number.MAX_SAFE_INTEGER) {
        return Result.typeError('overflow unsigned integer decimal 53 bits')
    }
    return Result.ok(number)
}

/**
 * Transform decimal string to positive integer number, 53 bits.
 *
 * @param {Decimal} value
 * @return {Result<TypeError, number>}
 */
function decimalToPInt(value) {
    let uintRegex = /^[0-9]+$/
    if (uintRegex.test(value) === false) {
        return Result.typeError('expect a positive integer decimal')
    }
    let number = Number.parseInt(value)
    if (number === 0) {
        return Result.typeError('expect a positive integer decimal')
    }
    if (number > Number.MAX_SAFE_INTEGER) {
        return Result.typeError('overflow positive integer decimal 53 bits')
    }
    return Result.ok(number)
}

/**
 * @param {Decimal} value
 * @return {Result<TypeError, Decimal>}
 * @example
 * toTidyUIntDecimal('123') // => '123'
 * toTidyUIntDecimal('00123') // => '123'
 * toTidyUIntDecimal('001230') // => '1230'
 * toTidyUIntDecimal('000') // => '0'
 */
function toTidyUIntDecimal(value) {
    let r1 = validateUIntDecimal(value)
    if (r1.error) {
        return r1
    }
    for (let i = 0; i < value.length; ++i) {
        if (value[i] !== '0') {
            let tidyValue = value.slice(i)
            return Result.ok(tidyValue)
        }
    }
    return Result.ok('0')
}

/**
 * @param {Decimal} value
 * @return {Result<TypeError, Decimal>}
 * @example
 * toTidyPIntDecimal('123') // => '123'
 * toTidyPIntDecimal('00123') // => '123'
 * toTidyPIntDecimal('001230') // => '1230'
 * toTidyPIntDecimal('000') // => error
 */
function toTidyPIntDecimal(value) {
    let r1 = validatePIntDecimal(value)
    if (r1.error) {
        return r1
    }
    for (let i = 0; i < value.length; ++i) {
        if (value[i] !== '0') {
            let tidyValue = value.slice(i)
            return Result.ok(tidyValue)
        }
    }
}

module.exports = {
    heximalToUInt,
    heximalToBuffer,
    decimalToUInt,
    decimalToPInt,
    mapObject,
    mapArray,
    toLowerTidyString,
    toTidyUIntDecimal,
    toTidyPIntDecimal
}
