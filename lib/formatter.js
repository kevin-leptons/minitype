'use strict'

const {Result} = require('./result')
const {Heximal} = require('./primitive')
const {
    validateHeximal,
    inspectHeximal,
    validateObject,
    validateArray
} = require('./validator')

/**
 * Transform heximal to 53 bits unsigned integer number.
 *
 * @param {Heximal} value
 * @return {Result<string, number>}
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
        return Result.typeError('heximal overflow 32 bits')
    }
    let number = Number(value, 16)
    return Result.ok(number)
}

/**
 * @typedef {Function} Formatter
 * @function
 * @param {any} source
 * @return {Result<string, any>}
 */

/**
 * `[0]` is name of attribute from source object. `[1]` is format function.
 * `[2]` is name of attribute in target object, `undefined` mean keep the
 * same name from source object.
 *
 * @typedef {Array<string, Formatter, undefined | string>} mapObjectAction
 */

/**
 * **Tags**: `PARTIAL_INPUT_VALIDATION`.
 *
 * @param {object} source
 * @param {Array<mapObjectAction>} actions - This input is not validate.
 * @return {Result<string, object>}
 * @example
 * let source = {string: '123'}
 * let target = mapObject(source, [
 *     ['string', v => Number(v), 'number']
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
 * @return {Array<Result<string, any>>}
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
 * @return {Result<string, string>}
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

module.exports = {
    heximalToUInt,
    mapObject,
    mapArray,
    toLowerTidyString
}
