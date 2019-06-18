'use strict';

const axios = require('axios');

class StockMarket {
    constructor(ticker){
        if(ticker) this._patch(ticker);
    };

    async _patch(ticker){
        const api = axios.create({
            baseURL: 'https://www.alphavantage.co'
        })
        const res = await api.get(`query?function=TIME_SERIES_INTRADAY&symbol=${ticker}.sao&interval=5min&apikey=${process.env.STOCK_KEY}`)

        console.log(res.data["Meta Data"]);
    }


}

module.exports = StockMarket;