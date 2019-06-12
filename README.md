# Whatsapp Client
BOT that connects throught Whatsapp Web Browser

**NOTE** I've been testing this application and its working for me, but it's not totally safe. 
Actually, it goes against whatsapp policy, then use it at your own risk. 

## Prerequisites
- Node
- Yarn

## Run Application
1. Clone repository
2. Run `yarn` on command line to download node_modules
3. Run `yarn bot` to start application
4. Scan `QR Code` with Whatsapp App
5. Send BOT messages to control it.

**Puppeteer** Will download Chromium automatically

## Bot Commands
**!ping** Answer with pong message  
**!echo** Answer with the same message  
**!desc** Send group description   

To add more commands, edit bot.js file.

### TO-DO
- [ ] Implement more bot commands 
- [ ] Integrate with artificial intelligence 
- [ ] Translate all comments to English

### Known Issues
You can't start Chromium as root user on Linux, it gives a Sandbox error. 
You can find a work around in [Puppeteer-Troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md). 