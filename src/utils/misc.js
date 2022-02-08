/**
 * creates a function that can only be called once
 * @param {function} fn
 * @param {object} context
 * @returns
 */
const once = (fn, context) => {
  let expired = false;
  let result;
  return (...args) => {
    if (!expired) result = context ? fn.apply(context, args) : fn(...args);
    expired = true;
    return result;
  };
};

/**
 * if the input isn't an array, an array will be returned containing the input
 * if the input is an array, the input will be returned
 * @template T
 * @param {T|T[]} input
 * @returns {T[]}
 */
const coerceArray = (input) => (Array.isArray(input) ? input : [input]);

/**
 * creates a promise that will return a rejection after <time> has expired
 * used in Promise.race()
 * @param {number} time
 * @param {string} msg
 * @returns
 */
const createTimeout = (time, msg = "operation timed out") =>
  new Promise((_res, rej) => setTimeout(() => rej(msg), time));

/**
 * promise wrapper that returns a rejection if the promise didn't resolve within <time>
 * @example 
 * const body = await waitFor(fetchFile('hello.txt'), 3000, 'file failed to fetch in 3 seconds.')
 * @template T
 * @param {Promise<T>} promise
 * @param {number} time
 * @param {string} msg
 * @returns {Promise<T>}
 */
const waitFor = (promise, time, msg) => Promise.race([promise, createTimeout(time, msg)]);

module.exports = { once, coerceArray, createTimeout, waitFor };
