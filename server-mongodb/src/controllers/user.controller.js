import { User } from '../models/user.model.js';

/** 
 * @template T
 * @typedef {([true, T] | [false, Error])} Maybe<T> 
 */

/** @returns {Promise<Maybe<null>>} */
export async function create(username, userData) {
    try {
        await User.create({ ...userData, username });
        return [true, null];
    } catch (e) {
        return [false, e];
    }
}

/** @returns {Promise<Maybe<any[]>>} */
export async function getByUsername(username) {
    try {
        const res = await User.findOne({ username }).select({ _id: 0, __v: 0 });
        if (!res) {
            return [false, new Error(`user '${username} not found'`)];
        }
        return [true, res];
    } catch (e) {
        return [false, e];
    }
}

/** @returns {Promise<Maybe<any[]>>} */
export async function getAll() {
    try {
        const res = await User.find().select({ _id: 0, __v: 0 });
        return [true, res];
    } catch (e) {
        return [false, e];
    }
}

/** @returns {Promise<Maybe<null>>} */
export async function replaceByUsername(username, userData) {
    try {
        await User.findOneAndReplace({ username }, userData);
        return [true, null];
    } catch (e) {
        return [false, e];
    }
}

/** @returns {Promise<Maybe<null>>} */
export async function updateByUsername(username, updates) {
    try {
        await User.findOneAndUpdate({ username }, updates);
        return [true, null];
    } catch (e) {
        return [false, e];
    }
}

/** @returns {Promise<Maybe<null>>} */
export async function deleteByUsername(username) {
    try {
        await User.findOneAndDelete({ username });
        return [true, null];
    } catch (e) {
        return [false, e];
    }
}
