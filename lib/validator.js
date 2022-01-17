'use strict'

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

module.exports = {
    isObject,
    isNonEmptyString
}
