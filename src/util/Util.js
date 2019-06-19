'use strict';

const axios = require('axios');
const https = require('https');
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
  static getStockInfo(ticker){

    const options = {};
    options.ticker = (ticker.length >= 4 && ticker.length <= 5) ? ticker : '';

    const query = {
        "symbols": {
            "tickers":[
                `BMFBOVESPA:${options.ticker}`
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
    
    axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                         httpsAgent: new https.Agent({ rejectUnauthorized: false })})
                .post('https://scanner.tradingview.com/brazil/scan', query)
                .then(res => { 
                  options.recommandation = res.data.data[0].d[0];
                  options.price          = res.data.data[0].d[2];
                  
                  return options;
                })
                .catch(err => console.log(err.message));
    
    return options;
  }
}

module.exports = Util;