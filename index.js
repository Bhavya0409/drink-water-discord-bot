import "dotenv/config";
import { Client, GatewayIntentBits, Events, Partials } from "discord.js";
import cron from "node-cron";

const SCHEDULE = [
  process.env.SCHEDULE_SUNDAY, // Sunday
  process.env.SCHEDULE_MONDAY, // Monday
  process.env.SCHEDULE_TUESDAY, // Tuesday
  process.env.SCHEDULE_WEDNESDAY, // Wednesday
  process.env.SCHEDULE_THURSDAY, // Thursday
  process.env.SCHEDULE_FRIDAY, // Friday
  process.env.SCHEDULE_SATURDAY, // Saturday
];

const CLIENT = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendMessage = async (user) => {
  const delay = Math.random() * process.env.MAXIMUM_DELAY_MINUTES * 60 * 1000;
  await sleep(delay);
  await user.send("Drink water!");
};

CLIENT.once(Events.ClientReady, async (client) => {
  const user = await client.users.fetch(process.env.USER_ID);

  SCHEDULE.forEach((dayHours, index) => {
    cron.schedule(
      `0 ${JSON.parse(dayHours).join(",")} * * ${index}`,
      () => sendMessage(user),
      {
        timezone: "America/New_York",
      },
    );
  });
});

// Reacting with any emoji to the message will delete the message
CLIENT.on(Events.MessageReactionAdd, async (reaction) => {
  if (reaction.partial) {
    await reaction.fetch();
  }
  await reaction.message.delete();
});

CLIENT.login(process.env.BOT_TOKEN);
