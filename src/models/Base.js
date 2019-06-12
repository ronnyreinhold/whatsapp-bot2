'use strict';

/**
 * Representa estrutura de dados do whatsapp.
 */

 class Base {
     constructor(client){
        /**
         * Cliente que instanciou o bot
         */
        Object.defineProperty(this, 'client', { value: client });
     }

     _clone(){
         return Object.assign(Object.create(this), this);
     }

     _patch(data) { return data; }

     /**
      * Name - Representa este Model no Whatsapp Web
      */
     static get WAppModel(){
         return this.name;
     }

     /**
      * Campos extras para adicionar ao Model Serialization
      */
     static get extraFields(){
         return [];
     }

 }

 module.exports = Base;