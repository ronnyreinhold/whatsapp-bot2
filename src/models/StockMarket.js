'use strict';

class StockMarket {
    constructor(data){
        console.log(data);
        debugger;
        this.ticker = null;
        this.price = null;
    };
    
    get price(){
        return this._price;
    }

    set price(price){
        this._price = price;
    }

}

module.exports = StockMarket;