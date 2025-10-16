import { getClient, isClientReady } from "../../bot/bot.js";
import sendMail from "../mailer/mailer.js";

async function registerService(req, res) {
  const { name, phoneNumber, email } = req.body;

  // Example: forward registration to a configured Discord channel
  const REGISTERED_STUDENTS_CHANNEL_ID = process.env.REGISTERED_STUDENTS_CHANNEL_ID;

  if (!REGISTERED_STUDENTS_CHANNEL_ID) {
    console.warn("REGISTERED_STUDENTS_CHANNEL_ID not set; skipping Discord notification.");
    return res.status(201).json({ message: "Registered (no notification)" });
  }

  const client = getClient();
  if (!client || !isClientReady()) {
    // Not ready yet
    console.warn("Discord client not ready; cannot send registration notification.");
    return res.status(201).json({ message: "Registered (discord not ready)" });
  }

  try {
    const channel = await client.channels.fetch(REGISTERED_STUDENTS_CHANNEL_ID);
    
    if (channel && typeof channel.send === "function") {
      await channel.send(
        `📩 **New registration from ${name}** :\nPhone: ${phoneNumber}\nEmail: ${email}`
      );
    }
  
  } catch (err) {
    console.error("Failed to send registration message to Discord:", err);
  }
  try {
    await sendMail(email)
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }

  return res.status(201).json({ message: "Register Successful" });
}

export default registerService;