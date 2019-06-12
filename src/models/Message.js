'use strict';

const Base = require('./Base');

/**
 * Representa uma Mensagem no Whatsapp
 * @extends {Base}
 */

 class Message extends Base {
    constructor(client, data){
        super(client);

        if(data) this._patch(data);
    }

    _patch(data){
        this.id          = data.id;
        this.body        = data.body;
        this.type        = data.type;
        this.timestamp   = data.t;
        this.from        = data.from;
        this.to          = data.to;
        this.author      = data.author;
        this.isForwarded = data.isForwarded;
        this.broadcast   = data.broadcast;

        return super._patch(data);
    }

    /**
     * Retorna o Chat onde a mensagem foi enviada
     */
    getChat(){
        return this.client.getChatById(this.from);
    }

    /**
     * Envia uma mensagem como resposta. Se o chatId for especificado, 
     * a mensagem será enviada através do chat especificado. Se não estiver
     * a mensagem será enviada no mesmo chat de onde a mensagem original foi enviada.
     * @param {string} message
     * @param {?string} chatId
     */
    async reply(message, chatId) {
        if (!chatId) {
            chatId = this.from;
        }
        
        return await this.client.pupPage.evaluate((chatId, quotedMessageId, message) => {
            let quotedMessage = Store.Msg.get(quotedMessageId);
            if(quotedMessage.canReply()) {
                const chat = Store.Chat.get(chatId);
                chat.composeQuotedMsg = quotedMessage;
                window.Store.SendMessage(chat, message, {quotedMsg: quotedMessage});
                chat.composeQuotedMsg = null;
            } else {
                throw new Error('This message cannot be replied to.');
            }
            
        }, chatId, this.id._serialized, message);
    }
    
    static get WAppModel() {
        return 'Msg';
    }

    static get extraFields() {
        return [
            'isNewMsg'
        ];
    }
 }

 module.exports = Message;