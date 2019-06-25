/**
 * @author Ronny Reinhold
 */

'use strict';

/**
 * Representa os dados de uma ação
 */
class StockMarket {
    constructor(data = {}){
        this._ticker         = data.ticker;
        this._name           = data.name;
        this._price          = data.price;
        this._recommendation = data.recommendation;
        this._open           = data.open;
        this._high           = data.high;
        this._low            = data.low;
        this._prevClose      = data.prevClose;
        this._variation      = data.variation;
        this._percent        = data.percent;     
    };
    
    // Getters 
    get ticker(){
        return this._ticker;
    }

    get name(){
        return this._name;
    }

    get price(){
        return this._price;
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

    get open(){
        return this._open;
    }

    get high(){
        return this._high;
    }

    get low(){
        return this._low;
    }

    get prevClose(){
        return this._prevClose
    }
    
    get variation(){
        return this._variation;
    }

    get percent(){
        return this._percent;
    }

}

module.exports = StockMarket;