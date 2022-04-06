'use strict'

const {Result} = require('./result')
const {Heximal} = require('./string')
const {validateUInt, validateInstance} = require('./validator')
const {heximalToUInt} = require('./formatter')

class Timestamp {
    /**
     * Unix timestamp in miliseconds.
     *
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {number} value - Unix timestamp in miliseconds, unsigned
     * integer number, 53 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     * @return {number} Unix timestamp in seconds.
     */
    toSeconds() {
        return Math.floor(this._value / 1000)
    }

    /**
     *
     * @param {Timestamp} other
     * @return {boolean}
     * @throws {TypeError}
     */
    lt(other) {
        validateInstance(other, Timestamp).open()
        return this._value < other._value
    }

    /**
     *
     * @param {Timestamp} other
     * @return {boolean}
     * @throws {TypeError}
     */
    gt(other) {
        validateInstance(other, Timestamp).open()
        return this._value > other._value
    }

    /**
     *
     * @param {Timespan} timespan
     * @return {Timestamp}
     * @throws {TypeError}
     */
    add(timespan) {
        validateInstance(timespan, Timespan).open()
        let miliseconds = this._value + timespan.value
        return new Timestamp(miliseconds)
    }

    /**
     * @return {boolean}
     */
    isFuture() {
        return this._value > Date.now()
    }

    /**
     * @return {boolean}
     */
    isPast() {
        return this._value < Date.now()
    }

    /**
     *
     * @return {boolean}
     */
    isPresentOrPast() {
        return this._value <= Date.now()
    }

    /**
     * Make a timestamp that points to current time.
     *
     * @return {Timestamp}
     */
    static now() {
        let miliseconds = Date.now()
        return new Timestamp(miliseconds)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Timestamp>}
     */
    static fromMiliseconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let instance = new Timestamp(value)
        return Result.ok(instance)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Timestamp>}
     */
    static fromSeconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let miliseconds = 1000 * value
        let r2 = validateUInt(miliseconds)
        if (r2.error) {
            return r2
        }
        let instance = new Timestamp(miliseconds)
        return Result.ok(instance)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<TypeError, Timestamp>}
     */
    static fromHeximalSeconds(value) {
        let r1 = heximalToUInt(value)
        if (r1.error) {
            return r1
        }
        let {data: seconds} = r1
        let miliseconds = 1000 * seconds
        let instance = new Timestamp(miliseconds)
        return Result.ok(instance)
    }
}

class Timespan {
    /**
     * Timespan in miliseconds.
     *
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {value} value - Timespan in miliseconds, unsigned
     * integer number, 53 bits.
     */
    constructor(value) {
        this._value = value
    }

    /**
     * @return {bigint}
     */
    toBigInt() {
        return BigInt(this._value)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Timespan>}
     */
    addMiliseconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let sum = this._value + value
        let data = new Timespan(sum)
        return Result.ok(data)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Timespan>}
     */
    addSeconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let miliseconds = 1000 * value
        let sum = this._value + miliseconds
        let data = new Timespan(sum)
        return Result.ok(data)
    }

    /**
     *
     * @return {Timespan}
     */
    clone() {
        return new Timespan(this._value)
    }

    /**
     * Time period in seconds.
     *
     * @return {string}
     */
    format() {
        let miliseconds = this._value % 1000
        let padMiliseconds = miliseconds.toString().padStart(3, '0')
        let seconds = (this._value - miliseconds) / 1000
        let oddSeconds = seconds % 60
        let padSeconds = oddSeconds.toString().padStart(2, '0')
        let minutes = (seconds - oddSeconds) / 60
        let oddMinutes = minutes % 60
        let padMinutes = oddMinutes.toString().padStart(2, '0')
        let hours = (minutes - oddMinutes) / 60
        let padHours = hours.toString().padStart(2, '0')
        return `${padHours}:${padMinutes}:${padSeconds}.${padMiliseconds}`
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Timespan>}
     */
    static fromMiliseconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let data = new Timespan(value)
        return Result.ok(data)
    }

    /**
     * @param {number} value
     * @return {Result<TypeError, Timespan>}
     */
    static fromSeconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let miliseconds = 1000 * value
        let r2 = validateUInt(value)
        if (r2.error) {
            return r2
        }
        let data = new Timespan(miliseconds)
        return Result.ok(data)
    }

    /**
     *
     * @param {number} value
     * @return {Result<TypeError, Timespan>}
     */
    static fromMinutes(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        let miliseconds = 60 * 1000 * value
        let r2 = validateUInt(miliseconds)
        if (r2.error) {
            return r2
        }
        let data = new Timespan(miliseconds)
        return Result.ok(data)
    }

    /**
     *
     * @param {Timestamp} milestone
     * @return {Result<TypeError, Timespan>}
     */
    static elapsedTime(milestone) {
        let r1 = validateInstance(milestone, Timestamp)
        if (r1.error) {
            return r1.error
        }
        let now = Timestamp.now()
        if (now._value < milestone._value) {
            return Result.typeError('milestone is in the future')
        }
        let miliseconds = now._value - milestone._value
        return Timespan.fromMiliseconds(miliseconds)
    }
}

module.exports = {
    Timestamp,
    Timespan
}
