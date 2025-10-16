
import { registerBotScript } from "./constants/common.js";

async function registerInteractionController(interaction) {
    if (!interaction.isButton()) return;

    const buttonInteraction = interaction ;

    if (buttonInteraction.customId === "register") {
        try {
            await buttonInteraction.user.send(`<@${buttonInteraction.user.id}> ${registerBotScript}`);
        } catch (err) {
            await buttonInteraction.reply({
                content: "❌ I couldn't DM you. Enable DMs from server members!",
                ephemeral: true,
            });
        }
    }
}

export default registerInteractionController;