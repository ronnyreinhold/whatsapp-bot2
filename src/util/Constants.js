'use strict';

exports.WhatsWebURL = 'https://web.whatsapp.com/'

exports.UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';

exports.Chrome = {
    NO_SANDBOX: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
}

exports.WA = { 
    BROSER_ID: '"eAd3btqL4XCrvuX/DXxmnQ=="',
    SECRET_BUNDLE: '{"key":"OCgOyhRk1HGT8Ois+aW3qHhjmfN3sKq13iSE/rFRym4=","encKey":"Sgi/x/au7rytcE9yNbUrdML6WlJ9j75f6o1c8/mndWI=","macKey":"OCgOyhRk1HGT8Ois+aW3qHhjmfN3sKq13iSE/rFRym4="}',
    TOKEN1: '"KC6G2APun48pcIbS4OcJjTAfoSxdxKDMDgSU5qxQzBM="',
    TOKEN2: '"1@g7wO7DDB5efn9a9QoXOstOD/9kK7/yBRoJywlbpU1rjk4xMz85VLClS5Kh3CB66HhdSxaFOpVVGmNg=="'
}

exports.DefaultOptions = {
    puppeteer: {
        headless: true
    },
    session: false,
    chrome: false
}

exports.Status = {
    INITIALIZING: 0,
    AUTHENTICATING: 1,
    READY: 3
}

exports.Events = {
    AUTHENTICATED: 'authenticated',
    AUTHENTICATION_FAILURE: 'auth_failure',
    READY: 'ready',
    MESSAGE_CREATE: 'message',
    QR_RECEIVED: 'qr',
    DISCONNECTED: 'disconnected'
}

exports.MessageTypes = {
    TEXT: 'chat',
    AUDIO: 'audio',
    VOICE: 'ptt',
    IMAGE: 'image',
    VIDEO: 'video',
    DOCUMENT: 'document',
    STICKER: 'sticker'
}

exports.ChatTypes = {
    SOLO: 'solo',
    GROUP: 'group',
    UNKNOWN: 'unknown'
}