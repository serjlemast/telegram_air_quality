### Air Quality Server app

#### Project setup

* Runtime: Node.js 22
* Bot Framework: Telegraf v4
* Hosting: Firebase Cloud Functions

#### Project configuration

Create a .env file in the root directory with the following variables:

BOT_TOKEN=your_telegram_bot_token
JWT_SECRET_KEY=your_jwt_secret
WEB_APP_URL=https://air-quality-svc.onrender.com/

#### Install & Initialize

1. npm install -g firebase-tools

2. npm install 

3. firebase login

4. firebase init

5. (Optional) cd functions

6. firebase use --add


#### Firebase Scripts

| Flag                                       | Description                       |
|--------------------------------------------|-----------------------------------|
| firebase emulators:start --only functions	 | Run local emulator for functions  |
| firebase functions:shell	                  | Launch interactive function shell |
| firebase deploy --only functions	          | Deploy functions to Firebase      |
| firebase functions:log                     | 	View function logs               |


#### Telegram Bot Behavior
* /start: Sends a description and button linking to the Web App.
* /help: Tells users to send a sticker.
* Other messages: Echoed back to the user.
* Errors: Logged and notified to the user.