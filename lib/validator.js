'use strict'

const {Result} = require('./result')
const {Decimal, Heximal} = require('./primitive')

/**
 * For native number and restrict by unsigned integer, 53 bits.
 *
 * @param {number} value
 * @return {Result<TypeError, undefined>}
 */
function validateUInt(value) {
    if (!Number.isInteger(value) || value < 0) {
        return Result.typeError('expect a unsigned integer')
    }
    if (value > Number.MAX_SAFE_INTEGER) {
        return Result.typeError('overflow unsigned integer 53 bits')
    }
    return Result.ok()
}

/**
 * For native number and restrict by positive integer, 53 bits.
 *
 * @param {number} value
 * @return {Result<TypeError, undefined>}
 */
function validatePInt(value) {
    if (!Number.isInteger(value) || value <= 0) {
        return Result.typeError('expect a positive integer')
    }
    if (value > Number.MAX_SAFE_INTEGER) {
        return Result.typeError('overflow positive integer 53 bits')
    }
    return Result.ok()
}

/**
 *
 * @param {number} value
 * @return {Result<TypeError, undefined>}
 */
function validateBigUInt(value) {
    if (typeof(value) === 'bigint' || value < 0) {
        return Result.typeError('expect a big unsigned integer')
    }
    return Result.ok()
}

/**
 * @private
 * @param {Heximal} value
 * @return {Result<TypeError, undefined>}
 */
function validateHeximal(value) {
    return /^0x[a-fA-F0-9]+$/.test(value)
        ? Result.ok()
        : Result.typeError('expect Heximal')
}

/**
 * @private
 * @param {HeximalByteArray} value
 * @return {Result<TypeError, undefined>}
 */
function validateHeximalByteArray(value) {
    return /^0x[a-fA-F0-9]*$/.test(value)
        ? Result.ok()
        : Result.typeError('expect HeximalByteArray')
}

/**
 * @private
 * @param {Decimal} value
 * @return {Result<TypeError, undefined>}
 */
function validateUIntDecimal(value) {
    return /^[0-9]+$/.test(value)
        ? Result.ok()
        : Result.typeError('expect a unsigned integer from decimal')
}

/**
 *
 * @param {Decimal} value
 * @return {Result<TypeError, undefined>}
 */
function validatePIntDecimal(value) {
    let pattern = /^[1-9][0-9]*$/
    return pattern.test(value)
        ? Result.ok()
        : Result.typeError('expect a positive integer from decimal')
}

/**
 *
 * @param {object} value
 * @return {Result<TypeError, undefined>}
 */
function validateObject(value) {
    return (typeof(value) !== 'object') || (value === null)
        ? Result.typeError('expect an object')
        : Result.ok()
}

/**
 *
 * @param {Array} value
 * @param {number} minSize
 * @param {maxSize} maxSize
 * @return {Result<TypeError, undefined>}
 */
function validateArray(value, minSize, maxSize) {
    if (!Array.isArray(value)) {
        return Result.typeError('expect an array')
    }
    if (minSize !== undefined && value.length < minSize) {
        return Result.typeError(`expect ${minSize} items at least`)
    }
    if (maxSize !== undefined && value.length > maxSize) {
        return Result.typeError(`expect ${maxSize} items at most`)
    }
    return Result.ok()
}

/**
 *
 * @param {Array} value
 * @param {Function | string} type
 * @param {number | undefined} minSize
 * @param {number | undefined} maxSize
 * @return {Result<TypeError, undefined>}
 * @example
 * // Validate list of numbers.
 * let n = [1, 2, 3]
 * validateArrayItems(n, 'number').open()
 *
 * // Validate list of buffers.
 * let b = [
 *     Buffer.from([1]),
 *     Buffer.from([2])
 * ]
 * validateArrayItems(b, Buffer).open()
 */
function validateArrayItems(
    value, type, minSize = undefined, maxSize = undefined
) {
    let r1 = validateArray(value)
    if (r1.error) {
        return r1
    }
    if (minSize !== undefined && value.length < minSize) {
        return Result.typeError(`expect ${minSize} items at least`)
    }
    if (maxSize !== undefined && value.length > maxSize) {
        return Result.typeError(`expect ${maxSize} items at most`)
    }
    for (let i = 0; i < value.length; ++i) {
        let r2 = validateInstance(value[i], type)
        if (r2.error) {
            return Result.typeError(`[${i}]: ${r2.error.message}`)
        }
    }
    return Result.ok()
}

/**
 * Return `true` if input is an object and not `null`.
 *
 * @param {object} value
 * @return {boolean}
 */
function isObject(value) {
    return typeof(value) === 'object' && value !== null
}

/**
 *
 * @param {string} value
 * @return {boolean}
 */
function isNonEmptyString(value) {
    return typeof(value) === 'string' && value.length > 0
}

/**
 * @template T
 * @param {T} value
 * @param {Function | string} type
 * @return {Result<TypeError, T>}
 * @example
 * validateInstance(null, 'any')
 * validateInstance('foo', 'string')
 * validateInstance(true, 'boolean')
 * validateInstance(1, 'number')
 * validateInstance([1, 2], Array)
 */
function validateInstance(value, type) {
    if (type === 'any') {
        return Result.ok(value)
    }
    else if (typeof(type) === 'string') {
        return typeof(value) === type
            ? Result.ok(value)
            : Result.typeError(`expect type ${type}`)
    }
    else {
        return (value instanceof type)
            ? Result.ok(value)
            : Result.typeError(`expect ${type.name}`)
    }
}

/**
 * Validate object attributes by type.
 *
 * @param {object} value - Object for validations.
 * @param {Array<string, Function  | string, boolean>} specs - List of
 * attribute specifications. `specs[][0]` is attribute name. `specs[][1]` is a
 * type, or a string, string mean primitive type such as `any`, `object`,
 * `number`, `boolean`. `specs[][2]` make optional attribute by `true`,
 * default is `false`.
 * @param {boolean} strict - If there are attributes which is not specify then
 * retun error.
 * @return {Result<TypeError, undefined>}
 * @example
 * let object = {
 *     one: 1,
 *     two: 'two',
 *     buffer: Buffer.from([])
 * }
 * let result = validateInstanceMap(object, [
 *     ['one', 'number'],
 *     ['two', 'string'],
 *     ['buffer', Buffer]
 * ])
 */
function validateInstanceMap(value, specs, strict = true) {
    let r1 = validateObject(value)
    if (r1.error) {
        return r1
    }
    if (strict) {
        let attributes = specs.map(spec => spec[0])
        let r2 = validateAttributes(value, attributes)
        if (r2.error) {
            return r2
        }
    }
    for (let [name, type, optional] of specs) {
        let attributeValue = value[name]
        if (optional && attributeValue === undefined) {
            continue
        }
        let r3 = validateInstance(attributeValue, type, name)
        if (r3.error) {
            return Result.typeError(name + ': ' + r3.error.message)
        }
    }
    return Result.ok()
}

/**
 * Check an object has not accepted attribute names.
 *
 * @param {object} value
 * @param {Array<string>} acceptedAttributes
 * @return {Result<TypeError, undefined>}
 */
function validateAttributes(value, acceptedAttributes = []) {
    let objectAttributes = Object.getOwnPropertyNames(value)
    let acceptedAttributeSet = new Set(acceptedAttributes)
    for (let name of objectAttributes) {
        if (!acceptedAttributeSet.has(name)) {
            return Result.typeError(`${name}: not accepted attribute name`)
        }
    }
    return Result.ok()
}

/**
 * **Tags:** `NO_INPUT_VALIDATION`.
 *
 * @param {Heximal} value
 * @return {Array<number, number | undefined>} `[0]` is quantities of
 * significant heximal digits, `[1]` is first significant digit.
 * @example
 * inspectHeximal('0x00fbcd') // => [4, 'f']
 */
function inspectHeximal(value) {
    for (let i = 2; i < value.length; ++i) {
        if (value[i] !== '0') {
            return [value.length - i, value[i]]
        }
    }
    return [0, undefined]
}

/**
 * **Tags:** `NO_INPUT_VALIDATION`.
 *
 * @param {Decimal} value
 * @return {Array<number, number | undefined>} - `[0]` is quantities of
 * significant digits, `[1]` is first significant digit.
 * @example
 * inspectDecimal('00123') // => [3, '1']
 */
function inspectDecimal(value) {
    for (let i = 0; i < value.length; ++i) {
        if (value[i] !== '0') {
            return [value.length - i, value[i]]
        }
    }
    return [0, undefined]
}

module.exports = {
    validateUInt,
    validatePInt,
    validateBigUInt,
    validateHeximal,
    validateHeximalByteArray,
    validateUIntDecimal,
    validatePIntDecimal,
    validateObject,
    validateArray,
    validateArrayItems,
    inspectHeximal,
    inspectDecimal,
    isObject,
    isNonEmptyString,
    validateInstance,
    validateInstanceMap,
    validateAttributes
}
