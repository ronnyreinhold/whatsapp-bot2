'use strict';

const axios = require('axios');
const https = require('https');

class StockMarket {
    constructor(options = {}){
        this._ticker         = options.ticker;
        this._recommendation = options.stockInfo[0];
        this._price          = options.stockInfo[2];
    };
  
    get price(){
        return this._price;
    }

    set price(price){
        this._price = price;
    }

    get recommendation(){
        console.log(this._recommendation)
        if(this._recommendation < -0.3){
            return "Venda Forte"
        } else if(this._recommendation < -0.1) {
            return "Vender"
        } else if(this._recommendation < 0.1){
            return "Neutro"
        } else if(this._recommendation < 0.4){
            return "comprar"
        } else if(this._recommendation > 0.4){
            return "comprar Forte"
        }
        
    }

    set recommendation(recommendation){
        this._recommendation = recommendation;
    }     

}

module.exports = StockMarket;