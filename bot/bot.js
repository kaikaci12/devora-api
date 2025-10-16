import dotenv from "dotenv";
import { Client, IntentsBitField, ChannelType, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import registerInteractionController from "./register.interaction.service.js";

dotenv.config();
const token = process.env.TOKEN;

// Module-level client reference (singleton)
let client = null;

export function getClient() {
  return client;
}

export function isClientReady() {
  return !!(client && client.user);
}

export async function startBot() {
  if (client) {
    // already started
    return client;
  }

  client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.DirectMessages,
      IntentsBitField.Flags.DirectMessageTyping,
    ],
  });

  client.on("ready", async () => {
  try {
    const channel = await client.channels.fetch("1424346272680116345");

    if (channel && 'isTextBased' in channel && (channel ).isTextBased && 'send' in channel) {
      // Fetch pinned messages to check if our button message already exists
      const pinnedMessages = await channel.messages.fetchPinned();

      // Check if there's already a pinned message with our button
      const existingMessage = pinnedMessages.find((msg) =>
        msg.author.id === client.user?.id &&
        msg.content.includes('დააჭირეთ ღილაკს "რეგისტრაცია"')
      );

      if (existingMessage) {
        console.log("✅ Registration button message already exists!");
        return;
      }

      // Only create new message if it doesn't exist
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("register")
          .setLabel("რეგისტრაცია")
          .setStyle(ButtonStyle.Primary)
      );

      const sent = await channel.send({
        content: 'დააჭირეთ ღილაკს "რეგისტრაცია" და შეამოწმეთ პირადი შეტყობინება👇\n',
        components: [row],
      });

      if (sent && typeof sent.pin === 'function') {
        await sent.pin();
      }

      console.log("✅ New pinned message with buttons created!");
    }
  } catch (err) {
    console.error("Error in ready handler:", err);
  }
});

    client.on("interactionCreate", (interaction) => registerInteractionController(interaction));
    client.on("messageCreate", async (m) => {
    // Ignore bot messages
    if (m.author.bot) return;
  
    // Check if the message is from a DM (not a server)
    if (m.channel.type == ChannelType.DM) {
        const REGISTERED_STUDENTS_CHANNEL_ID = process.env.REGISTERED_STUDENTS_CHANNEL_ID;
        const guildChannelId = REGISTERED_STUDENTS_CHANNEL_ID;

        if (!guildChannelId) {
          console.error("REGISTERED_STUDENTS_CHANNEL_ID is not defined in environment variables.");
          await m.channel.send("❌ ვერ მოხერხდა რეგისტრაციის გადაგზავნა. გთხოვთ სცადოთ მოგვიანებით.");
          return;
        }

        try {
          const targetChannel = await client.channels.fetch(guildChannelId);
          if (!targetChannel || !('send' in targetChannel)) {
            console.error("Target channel not found or cannot send messages.");
            await m.channel.send("❌ ვერ მოხერხდა რეგისტრაციის გადაგზავნა. გთხოვთ სცადოთ მოგვიანებით.");
            return;
          }
          await targetChannel.send(
            `📩 **New Registration <@${m.author.id}>**:\n${m.content}`
          );

          // Optional: Confirm to the user
          await m.channel.send("✅ მიღებულია, მენეჯერი მალე დაგიკავშირდებათ! ❤️");

        } catch (err) {
          console.error("Couldn't forward DM:", err);
        }
      }
  })
  client.login(token);
  return client;
}
