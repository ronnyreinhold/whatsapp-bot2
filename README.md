# Whatsapp Client
BOT that connects throught Whatsapp Web Browser

**NOTE** I've been testing this application and its working for me, but it's not totally safe. 
Actually, it goes against whatsapp policy, then use it at your own risk. 

## Prerequisites
- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/)

## Run Application
1. Clone repository
2. Run `yarn` on command line to download node_modules
3. Run `yarn bot` to start application
4. Scan `QR Code` with Whatsapp App or config `WA Session` into **.env** file
   It must contain `BROWSER_ID`, `SECRET_BUNDLE`, `TOKEN1` and `TOKEN2`
5. Send BOT COMMANDS to control it.

**Puppeteer** Will download Chromium automatically.

## Run in Docker
1. Clone repository
2. Run `docker-compose up -d`  

Dockerfile and docker-compose it's already pre-configured. You'll only need to provide your **WA Session** info into docker-compose, under **environment** options.

## Bot Commands
**!ping** Answer with pong message  
**!echo** Answer with the same message  
**!desc** Send group description
**!ibov ticker** Send Stock Market info from `Bovespa B3`. You can specify a company ticke like PETR4 or a FII ticker like VRTA11.      

To add more commands, edit bot.js file.

### TO-DO
- [ ] Implement more bot commands. 
- [ ] Integrate with artificial intelligence. 
- [ ] Translate all code comments to English.
- [x] Implement Stock Market Info.
- [x] Create Dockerfile.

### ~~Known Issues~~
~~You can't start Chromium as root user on Linux, it gives a Sandbox error.~~
~~You can find a work around in [Puppeteer-Troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md).~~  
You can pass `chome: Chrome.NO_SANDNBOX` proprierty into Client when instatiate it to solve this issue.  