'use strict';

const axios = require('axios');
const https = require('https');

class StockMarket {
    constructor(ticker){
        this._ticker         = ticker;
        this._recommendation = "";
        this._price          = 0;
    };
  
    get price(){
        if(this._price == 0){
            this.getStockInfo(this._ticker);
            return this._price;
        } else {
            return this._price;
        }
    }

    set price(price){
        this._price = price;
    }

    get recommendation(){
        return this._recommandation;
    }

    set recommendation(recommendation){
        this._recommandation = recommendation;
    }

    getStockInfo(ticker){
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

        axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                       httpsAgent: new https.Agent({ rejectUnauthorized: false })})
             .post('https://scanner.tradingview.com/brazil/scan', query)
             .then(res => {
                this.recommendation = res.data.data[0].d[0];
                this.price = res.data.data[0].d[2];
             })
             .catch(err => console.log(err.message));
    }

        

}

module.exports = StockMarket;