import "dotenv/config";
import { Client, GatewayIntentBits, Events } from "discord.js";
import cron from "node-cron";

const CLIENT = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const sendMessage = async (user) => await user.send("Drink water!");

CLIENT.once(Events.ClientReady, async (client) => {
  const user = await client.users.fetch(process.env.USER_ID);

  // Send message every hour from 8pm to 1am EST
  cron.schedule("0 20-23 * * *", () => sendMessage(user), {
    timezone: "America/New_York",
  });
  cron.schedule("0 0-1 * * *", () => sendMessage(user), {
    timezone: "America/New_York",
  });
});

CLIENT.login(process.env.BOT_TOKEN);
