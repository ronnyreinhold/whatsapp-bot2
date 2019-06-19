'use strict';

const axios = require('axios');

class StockMarket {
    constructor(ticker){
        this.ticker = ticker;
        this.price  = 0.0;

        if(ticker) this._patch(ticker);
    };

    async _patch(ticker){

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
        await axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
             .post('https://scanner.tradingview.com/brazil/scan', query)
             .then(res => {
                this.price          = res.data.data[0].d[2];
                this.recommendation = res.data.data[0].d[0];
                
                console.log(res.data.data[0].d);
                console.log(res.data.data[0].d[0]);
                console.log(res.data.data[0].d[1]);
                console.log(res.data.data[0].d[2]);
             })
             .catch(err => console.log(err.message));
    }
    
    getPrice(){
        return this.price;
    }

}

module.exports = StockMarket;