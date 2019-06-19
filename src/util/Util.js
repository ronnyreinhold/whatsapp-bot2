'use strict';

const axios = require('axios');
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
   * Get`s Stock price
   */
  static async getStockInfo(ticker){
    if(ticker.length < 4 || ticker.length > 5){
          throw new Error(`The ${ticker} company must have between 4 and 5 caracters`);
    }

    const query = {
        "symbols": {
            "tickers":[
                `BMFBOVESPA:${this.ticker}`
            ],
            "query": {
                "types":[]}
            },
        "columns":[
            "Recommend.All",
            "EMA5",
            "close"
        ]
    }

    return await axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                      .post('https://scanner.tradingview.com/brazil/scan', query)
                      .then(res => (res.data.data));

  }
}

module.exports = Util;