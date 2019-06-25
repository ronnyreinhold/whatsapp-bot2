/**
 * @author Ronny Reinhold
 */

'use strict';

const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

class Util {

  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
  * Sets default properties on an object that aren't already specified.
  * @param {Object} def Default properties
  * @param {Object} given Object to assign defaults to
  * @returns {Object}
  * @private
  */
  static mergeDefault(def, given) {
    if (!given) return def;
    for (const key in def) {
      if (!has(given, key) || given[key] === undefined) {
        given[key] = def[key];
      } else if (given[key] === Object(given[key])) {
        given[key] = Util.mergeDefault(def[key], given[key]);
      }
    }

    return given;
  }

  /**
   * Gets session data passa throught Dockerfile or .env file
   * @returns {object} session
   * @private
   */
  static getSession(){
    if( process.env.BROWSER_ID && process.env.SECRET_BUNDLE && process.env.TOKEN1 && process.env.TOKEN2 ) {
      let session = {
        WABrowserId: process.env.BROWSER_ID,
        WASecretBundle: process.env.SECRET_BUNDLE,
        WAToken1: process.env.TOKEN1,
        WAToken2: process.env.TOKEN2
      }

      return session;
    }
    return false;
  }


}

module.exports = Util;