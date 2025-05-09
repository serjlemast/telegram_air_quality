const {Telegraf} = require("telegraf");
const {message} = require("telegraf/filters");

const {
    debug, error,
} = require("firebase-functions/logger");

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: {webhookReply: true},
});

// Commands
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.start((ctx) => {
    const queryId = ctx.update.callback_query ?
        ctx.update.callback_query.id :
        null;
    const url = `${process.env.WEB_APP_URL}`;
    const webAppUrl = `${url}?start_param=value&query_id=${queryId}`;

    // Create button with WebApp
    return ctx.reply("Breathe easy with <b>AirQualityService</b>! 🌿 Stay informed about the air you breathe—anytime, anywhere. Our service continuously monitors air quality and instantly notifies you when levels go beyond safe limits. Whether you're planning outdoor activities or just want to stay healthy, we’ve got you covered.  \n" +
        "\n" +
        "Stay ahead of pollution—track, react, and breathe better with <b>AirQualityService</b>! 💨✅", {
        parse_mode: "HTML",  // ✅ Enables HTML parsing
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "View", web_app: {
                            url: webAppUrl,
                        },
                    }]],
        }
    });
});

// Message handler
bot.on(message(), (ctx) => {
    debug("Message handler: ", ctx.message);
    return ctx.copyMessage(ctx.chat.id);
});

// Error handling
bot.catch(async (err, ctx) => {
    error("[Bot] Error:", err);

    try {
        const errMsg = `Oops, encountered an error for ${ctx.updateType}`;
        await ctx.reply(errMsg);
    } catch (replyError) {
        error("[Bot] Failed to send error message:", replyError);
    }
});

module.exports = bot;
