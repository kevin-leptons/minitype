'use strict'

/**
 * @template E - Type of error.
 * @template D - Type of returned data.
 * @example
 * // Return failed result.
 * let error = new TypeError('expect unsigned integer')
 * return Result.error(error)
 *
 * // Return succeeded result.
 * let data = 100
 * return Result.ok(data)
 *
 * // Handle error and retrieve data.
 * let {error, data} = result
 * if (error) {
 *     // Report `error`.
 * }
 * else {
 *     // Process `data`.
 * }
 *
 * // Force retrieving data, if there is an error then it will be throw.
 * let data = result.open()
 */
class Result {
    /**
     * Indicate an error, can be anything, for example: string, Error.
     *
     * @type {E}
     */
    get error() {
        return this._error
    }

    /**
     * Valid data which is returned.
     *
     * @type {D}
     */
    get data() {
        return this._data
    }

    /**
     *
     * @param {E} error
     * @param {D} data
     */
    constructor(error, data) {
        this._error = error
        this._data = data
    }

    /**
     * @return {D}
     * @throws {E}
     */
    open() {
        if (this._error) {
            if (this._error instanceof Error) {
                throw this._error
            }
            throw new Error(this._error)
        }
        return this._data
    }

    /**
     *
     * @param {E} error
     * @return {Result<E, undefined>}
     */
    static error(error) {
        return new Result(error)
    }

    /**
     *
     * @param {string} message
     * @return {Result<TypeError, undefined>}
     */
    static typeError(message) {
        let error = new TypeError(message)
        return new Result(error)
    }

    /**
     *
     * @param {D} data
     * @return {Result<undefined, D>}
     */
    static ok(data) {
        return new Result(undefined, data)
    }
}

module.exports = {
    Result
}
