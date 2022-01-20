'use strict'

const {Result} = require('./result')
const {Heximal} = require('./string')
const {validateUInt} = require('./validator')
const {heximalToUInt} = require('./formatter')

class Timestamp {
    /**
     * Timestamp in miliseconds.
     *
     * @type {number}
     */
    get value() {
        return this._value
    }

    /**
     * **Tags:** NO_INPUT_VALIDATION.
     *
     * @param {number} value - Timestamp in miliseconds, unsigned
     * integer number, 53 bits.
     */
    constructor(value) {
        this._value = value
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
     * @return {Result<string, Timestamp>}
     */
    static fromMiliseconds(value) {
        let r1 = validateUInt(value)
        if (r1.error) {
            return r1
        }
        return new Timestamp(value)
    }

    /**
     *
     * @param {number} value
     * @return {Result<string, Timestamp>}
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
        let data = new Timestamp(miliseconds)
        return Result.ok(data)
    }

    /**
     *
     * @param {Heximal} value
     * @return {Result<Timestamp>}
     */
    static fromHeximalSeconds(value) {
        let r1 = heximalToUInt(value)
        if (r1.error) {
            return r1
        }
        let {data: seconds} = r1
        return Timestamp.fromSeconds(seconds)
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
     * @return {Result<string, Timespan>}
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
     * @return {Result<string, Timespan>}
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
     * @return {Result<string, Timespan>}
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
     * @return {Result<string, Timespan>}
     */
    static elapsedTime(milestone) {
        if ((milestone instanceof Timestamp) === false) {
            return Result.typeError('expect a Timestamp')
        }
        let now = Timestamp.now()
        if (now.value < milestone.value) {
            return Result.typeError('milestone is in the future')
        }
        let miliseconds = now.value - milestone.value
        return Timespan.fromMiliseconds(miliseconds)
    }
}

module.exports = {
    Timestamp,
    Timespan
}
