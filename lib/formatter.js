'use strict'

const {Result} = require('./result')

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
 * @typedef {Array<string, Formatter, undefined | string>} FormatObjectAction
 */

/**
 * **Tags**: `NO_INPUT_VALIDATION`.
 *
 * @param {object} source
 * @param {Array<FormatObjectAction>} actions
 * @return {Result<string, object>}
 * @example
 * let source = {string: '123'}
 * let target = formatObject(source, [
 *     ['string', v => Number(v), 'number']
 * ])
 */
function formatObject(source, actions) {
    let target = {}
    for (let i = 0; i < actions.length; ++i) {
        let [sourceAttribute, formatter, targetAttribute] = actions[i]
        let sourceValue = source[sourceAttribute]
        let {error, data: targetValue} = formatter(sourceValue)
        if (error) {
            return Result.error(`${sourceAttribute}: ${error}`)
        }
        targetAttribute = targetAttribute || sourceAttribute
        target[targetAttribute] = targetValue
    }
    return Result.ok(target)
}

module.exports = {
    formatObject
}
