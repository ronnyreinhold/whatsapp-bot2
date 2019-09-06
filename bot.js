/**
 * @author Ronny Reinhold
 */

'use strict'

const Client  = require('./src/Client');
const Util = require('./src/util/Util');
const StockMarketController = require('./src/controllers/StockMarketController');
const { Chrome } = require('./src/util/Constants');
const dotenv = require('dotenv');
dotenv.config();

// Chromium config to accept root interaction
const sandbox = process.env.NO_SANDBOX === "true" ? Chrome.NO_SANDBOX : false;
// Gets Session config passed throught .env or dockerfile
const session = Util.getSession();

const client = new Client({ session, chrome: sandbox, puppeteer: { headless: false }});

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

    if (msg.body.toUpperCase().indexOf('RONNY') > -1) {
        // Verifica se a mensagem é privada
        let chat = await msg.getChat();
        if(chat.isGroup) {
            // Envia mesangem como resposta
            msg.reply('Chamou? Se for importante, manda msg no privado... Não estou conseguindo acompanhar os grupos 😓');
        } else {
            msg.reply('Chamou? 🤔');
        }

    } else if (
        msg.body.toUpperCase() == 'OI' > -1 || 
        msg.body.toUpperCase() == 'OPA' > -1 ||
        msg.body.toUpperCase().indexOf('BOM DIA') > -1 ||
        msg.body.toUpperCase().indexOf('BOA TARDE') > -1 ||
        msg.body.toUpperCase().indexOf('BOA NOITE') > -1) {
        
        // Verifica se a mensagem é privada
        let chat = await msg.getChat();
        if(!chat.isGroup) {
            // Envia mesangem como resposta
            msg.reply('Oi, tudo bem? Olha só... me da uns minutinhos que já vou te responder');
            client.sendMessage(msg.from, 'Se for algo muito urgente, por favor, responda com a palavra: importante');
            client.sendMessage(msg.from, 'Mas se for algo que podemos resolver com calma, envie um email com o assunto para: *ronny@reinhold.com.br*, Obrigado!');
        }

    } else if (msg.body.toUpperCase().indexOf('IMPORTANTE') > -1) {
        // Verifica se a mensagem é privada
        let chat = await msg.getChat();
        if(!chat.isGroup) {
            // Envia mensagem para o mesmo chat
            msg.reply('Entendi, estou gerando uma notificação de alerta para o Ronny 👍');
        }

    } else if (msg.body == '!ping') {
        // Envia mensagem para o mesmo chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!ibov ')) {
        // Obtem o ticker enviado na msg
        const ticker  = msg.body.slice(6).toUpperCase();

        // Obtem dados da ação selecionada e envia msg 
        const stockInfo = StockMarketController.getStockInfoByTicker(ticker);
        stockInfo.then(stock => {
            client.sendMessage(msg.from, 
                `*Company Info*

                *Nome:* ${stock.name}
                *Ticker:* ${ticker}
                *Preço:* R$${stock.price}                
                *Abertura Dia:* R$${stock.open}
                *Alta Dia:* R$${stock.high}
                *Baixa Dia:* R$${stock.low}
                *Fech Anterior:* R$${stock.prevClose}
                *Variação R$:* R$${stock.variation}
                *Variação Δ:* ${stock.percent}%
                *Recomendação:* ${stock.recommendation}`
            );
        })

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
