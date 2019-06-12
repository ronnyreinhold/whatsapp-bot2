const Client  = require('./src/Client');

const client = new Client({ puppeteer: { headless: false }});
// Você pode utilizar uma sessão existente do Whatsapp Web para evitar ficar lendo QRCode, basta adicionar os dados de uma sessão existente
// O objeto precisa incluir WABrowserId, WASecretBundle, WAToken1 and WAToken2.


client.initialize();

client.on('qr', (qr) => {
    // NOTE: Esse evento não será disparado se uma sessão for especificada
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    // Dispara se a sessão não for restaurada com sucesso
    console.error('AUTHENTICATION FAILURE', msg);
})

client.on('ready', () => {
    console.log('READY');
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body && msg.body.toUpperCase().indexOf('RONNY') > -1) {
        // Envia mesangem como resposta
        msg.reply('Chamou?');

    } else if (msg.body == '!ping') {
        // Envia mensagem para o mesmo chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!subject ')) {
        // Altera o assunto do grupo
        let chat = await msg.getChat();
        if(chat.isGroup) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!echo ')) {
        // Responde com a mesma mensagem
        msg.reply(msg.body.slice(6));
    } else if (msg.body.startsWith('!desc ')) {
        // Altera descrição do grupo
        let chat = await msg.getChat();
        if(chat.isGroup) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body == '!leave') {
        // Sai do grupo
        let chat = await msg.getChat();
        if(chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if(msg.body == '!groupinfo') {
        let chat = await msg.getChat();
        if(chat.isGroup) {
            msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    }
});

client.on('disconnected', () => {
    console.log('Client was logged out');
})
