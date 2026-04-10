import "dotenv/config";
import { Client, GatewayIntentBits, Events } from "discord.js";

const CLIENT = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

CLIENT.once(Events.ClientReady, async (client) => {
  const user = await client.users.fetch(process.env.USER_ID);
  await user.send("Drink water!");
  client.destroy();
});

CLIENT.login(process.env.BOT_TOKEN);
