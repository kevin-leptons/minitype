'use strict'

const {Result} = require('./result')
const {Heximal} = require('./primitive')
const {validateInstance} = require('./validator')
const {heximalToBuffer} = require('./formatter')

/**
 * Array of bytes as a buffer.
 */
class ByteData {
    /**
     * @type {Buffer}
     */
    get value() {
        return this._value
    }

    /**
     *
     * @param {Buffer} value
     */
    constructor(value) {
        this._value = value
    }

    /**
     * @param {Buffer} value
     * @return {Result<TypeError, ByteData>}
     */
    static fromBuffer(value) {
        let r1 = validateInstance(value, Buffer)
        if (r1.error) {
            return r1
        }
        let instance = new ByteData(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, ByteData>}
     */
    static fromHeximal(value) {
        let r1 = heximalToBuffer(value)
        if (r1.error) {
            return r1
        }
        let instance = new ByteData(r1.data)
        return Result.ok(instance)
    }

    /**
     *
     * @param {ByteData} target
     * @return {boolean}
     */
    eq(target) {
        validateInstance(target, ByteData).open()
        return (this._value.compare(target.value) === 0)
    }

    /**
     *
     * @param {ByteData} target
     * @return {boolean}
     */
    lt(target) {
        validateInstance(target, ByteData).open()
        if (this._value.length < target._value.length) {
            return true
        }
        if (this._value.length > target._value.length) {
            return false
        }
        return (this._value.compare(target.value) === -1)
    }

    /**
     *
     * @param {ByteData} target
     * @return {boolean}
     */
    gt(target) {
        validateInstance(target, ByteData).open()
        if (this._value.length > target._value.length) {
            return true
        }
        if (this._value.length < target._value.length) {
            return false
        }
        return (this._value.compare(target.value) === 1)
    }

}

module.exports = {
    ByteData
}
