/**
 * @author Ronny Reinhold
 */

'use strict';

const Chat = require('./Chat');

/**
 * Representa um Grupo no Whatsapp
 * @extends {Chat}
 */
class GroupChat extends Chat {
    _patch(data) {
        this.groupMetadata = data.groupMetadata;

        return super._patch(data);
    }

    /**
     * Pega o dono do Grupo
     */
    get owner() {
        return this.groupMetadata.owner;
    }
    
    /**
     * Pega a data em que o Grupo foi criado
     */
    get createdAt() {
        return new Date(this.groupMetadata.creation * 1000);
    }

    /** 
     * Pega a descrição do Grupo
     */
    get description() {
        return this.groupMetadata.desc;
    }
    /**
     * Pega a lista de participantes do Grupo
     */
    get participants() {
        return this.groupMetadata.participants;
    }

    /**
     * Adiciona uma lista de participantes pelo ID no Grupo
     * @param {Array[string]} participantIds 
     */
    async addParticipants(participantIds) {
        return await this.client.pupPage.evaluate((chatId, participantIds) => {
            return Store.Wap.addParticipants(chatId, participantIds);
        }, this.id._serialized, participantIds);
    }

    /**
     * Remove uma lista de participantes por ID no Grupo
     * @param {Array[string]} participantIds 
     */
    async removeParticipants(participantIds) {
        return await this.client.pupPage.evaluate((chatId, participantIds) => {
            return Store.Wap.removeParticipants(chatId, participantIds);
        }, this.id._serialized, participantIds);
    }

    /**
     * Promove o participante para Administrador do Grupo
     * @param {Array[string]} participantIds 
     */
    async promoteParticipants(participantIds) {
        return await this.client.pupPage.evaluate((chatId, participantIds) => {
            return Store.Wap.promoteParticipants(chatId, participantIds);
        }, this.id._serialized, participantIds);
    }

    /**
     * Remove status de Administrador do participante
     * @param {Array[string]} participantIds 
     */
    async demoteParticipants(participantIds) {
        return await this.client.pupPage.evaluate((chatId, participantIds) => {
            return Store.Wap.demoteParticipants(chatId, participantIds);
        }, this.id._serialized, participantIds);
    }

    /**
     * Atualiza o assunto do Grupo
     * @param {string} subject 
     */
    async setSubject(subject) {
        let res = await this.client.pupPage.evaluate((chatId, subject) => {
            return Store.Chat.get(chatId).setSubject(subject);
        }, this.id._serialized, subject);

        if(res.status == 200) {
            this.name = subject;
        }
    }

    /**
     * Atualiza a descrição do Grupo
     * @param {string} description 
     */
    async setDescription(description) {
        let res = await this.client.pupPage.evaluate((chatId, description) => {
            return Store.Chat.get(chatId).setGroupDesc(description);
        }, this.id._serialized, description);

        if (res.status == 200) {
            this.groupMetadata.desc = description;
        }
    }

    /**
     * Pega o codigo de convide de um Grupo específico
     */
    async getInviteCode() {
        let res = await this.client.pupPage.evaluate(chatId => {
            return Store.Wap.groupInviteCode(chatId);
        }, this.id._serialized);

        if (res.status == 200) {
            return res.code;
        } 

        throw new Error('Not authorized')
    }
    
    /**
     * Invilida o código de convite do Grupo e gera um novo
     */
    async revokeInvite() {
        return await this.client.pupPage.evaluate(chatId => {
            return Store.Wap.revokeGroupInvite(chatId);
        }, chatId);
    }

    /**
     * Retorna um objeto com infomação sobre o código de convite do Grupo
     * @param {string} inviteCode 
     */
    static async getInviteInfo(inviteCode) {
        return await this.client.pupPage.evaluate(inviteCode => {
            return Store.Wap.groupInviteInfo(inviteCode);
        }, inviteCode);
    }

    /**
     * Entra no Grupo com código de convite
     * @param {string} inviteCode 
     */
    static async join(inviteCode) {
        return await this.client.pupPage.evaluate(inviteCode => {
            return Store.Wap.acceptGroupInvite(inviteCode);
        }, inviteCode);
    }

    /**
     * Faz o BOT sair do Grupo
     */
    async leave() {
        return await this.client.pupPage.evaluate(chatId => {
            return Store.Wap.leaveGroup(chatId);
        }, this.id._serialized);
    }

}

module.exports = GroupChat;