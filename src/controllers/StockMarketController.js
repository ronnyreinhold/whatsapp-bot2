const axios = require('axios');
const https = require('https');
const StockMarket = require('../models/StockMarket');

class StockMarketController {
    /**
   * Get`s Stock info by it's ticker
   */
    static async getStockInfoByTicker(ticker){
        if(ticker.length < 5 || ticker.length > 6){
            throw new Error(`The ${ticker} company must have between 5 and 6 caracters`);
        }

        const query = {
            "symbols": {
                "tickers":[
                    `BMFBOVESPA:${ticker}`
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

        const res = await axios.create({ 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            httpsAgent: new https.Agent({ rejectUnauthorized: false })})
        .post('https://scanner.tradingview.com/brazil/scan', query)
        .then(res =>  { 
            
            return {
                recommendation: res.data.data[0].d[0],
                price: res.data.data[0].d[2]
            } 
        })
        .catch(err => console.log(err.message));

        await axios.all([
            axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}.sao&apikey=${process.env.ALPHA_STOCK_KEY}`),
            axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}.sao&apikey=${process.env.ALPHA_STOCK_KEY}`)
        ])
        .then(axios.spread((r, r2) => {
            res.name      = r.data.bestMatches[0]["2. name"]; 
            res.open      = r2.data["Global Quote"]["02. open"].slice(0, -2);
            res.high      = r2.data["Global Quote"]["03. high"].slice(0, -2);
            res.low       = r2.data["Global Quote"]["04. low"].slice(0, -2);
            res.prevClose = r2.data["Global Quote"]["08. previous close"].slice(0, -2);
            res.variation = r2.data["Global Quote"]["09. change"].slice(0, -2);
            res.percent   = r2.data["Global Quote"]["10. change percent"].slice(0, -3);
            
        }))

    return new StockMarket(res);
  }
}

module.exports = StockMarketController;