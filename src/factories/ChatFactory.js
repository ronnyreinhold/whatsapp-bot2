'use strict';

const PrivateChat = require('../models/PrivateChat');
const GroupChat   = require('../models/GroupChat');

class ChatFactory {
    static create(client, data) {
        if(data.isGroup) {
            return new GroupChat(client, data);
        }

        return new PrivateChat(client, data);
    }
}

module.exports = ChatFactory;