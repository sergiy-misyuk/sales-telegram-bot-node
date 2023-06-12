const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const { notifyRoutes } = require('./routes/notifyRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', notifyRoutes);

const PORT = process.env.PORT || 3000;
const token = process.env.TOKEN;
const url = 'https://smisyuk4.github.io/sales-telegram-bot-react/';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Заповни форму', {
      reply_markup: {
        inline_keyboard: [[{ text: 'order', web_app: { url } }]],
      },
    });
  }
});

app.listen(PORT, function () {
  console.log(`Server running. Use http://localhost:${PORT}/`);
});
