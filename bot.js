const Client  = require('./src/Client');
const Util = require('./src/util/Util');
const StockMarketController = require('./src/controllers/StockMarketController');
const { Chrome } = require('./src/util/Constants');
//const dotenv = require('dotenv');
//dotenv.config();

const session = {
    WABrowserId: process.env.BROWSER_ID,
    WASecretBundle: process.env.SECRET_BUNDLE,
    WAToken1: process.env.TOKEN1,
    WAToken2: process.env.TOKEN2
}

const client = new Client({ session, chrome: Chrome.NO_SANDBOX, puppeteer: { headless: false }});

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
        // Envia mesangem como resposta
        msg.reply('Chamou?');

    } else if (msg.body == '!ping') {
        // Envia mensagem para o mesmo chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!ibov ')) {
        // Obtem o ticker enviado na msg
        let ticker  = msg.body.slice(6).toUpperCase();

        // Obtem dados da ação selecionada e envia msg 
        let stockInfo = StockMarketController.getStockInfoByTicker(ticker);
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
        .catch(err => console.log(err));

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
