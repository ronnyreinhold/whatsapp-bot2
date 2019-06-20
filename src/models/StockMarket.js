'use strict';

/**
 * Representa os dados de uma ação
 */
class StockMarket {
    constructor(data = {}){
        this._ticker         = data.ticker;
        this._recommendation = data.stockInfo.recommendation;
        this._price          = data.stockInfo.price;
    };
    
    // Getters and Setters
    get ticker(){
        return this._ticker;
    }

    set ticker(ticker){
        this._ticker = ticker;
    }

    get price(){
        return this._price;
    }

    set price(price){
        this._price = price;
    }

    get recommendation(){
        // Verifica o valor da recomendação e retorna mensagem correspondente
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
        } else {
            return "Não é possível recomendar essa ação"
        } 
    }

    set recommendation(recommendation){
        this._recommendation = recommendation;
    }     

}

module.exports = StockMarket;