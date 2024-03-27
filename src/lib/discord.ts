"use server"
/* LIBRARIES */
import { nanoid } from 'nanoid'

/* CONFIG */
import { config } from "@/config"

/* ENV */
import { env_server } from '@/env/server.mjs';

enum LOG_LEVELS {
  error = 14362664,
  warn = 16497928,
  info = 2196944,
}

interface IDiscordLogger {
  channel: string,
  event: string,
  description: string;
  type: keyof typeof LOG_LEVELS;
  icon?: string;
  userId?: string;
  tags?: { [key: string]: any }
}

/**
 * Send a log message to a Discord server through a webhook.
 *
 * @param {IDiscordLogger} data - The log data to send to Discord.
 * @returns {Promise<void>} - A promise that resolves when the message is sent or rejects if an error occurs.
 */
export const sendLogToDiscord = async (data: IDiscordLogger): Promise<void> => {

   // Generate a unique ID for this log entry.
  const id = nanoid();

  // Prepare the request body to send to Discord.
  let requestBody = {
    content: undefined as string | undefined,
    username: `${config.discord.bot_name} SERVER`,
    embeds: [{
      title:  `${data.icon} - ${data.channel} - ${data.event} ${ data.userId ? `- userId: ${data.userId}` : '' }`,
      description: data.description,
      color: LOG_LEVELS[data.type],
      fields: [] as any[],
      timestamp: new Date().toISOString(),
      footer: {
        text: config.discord.bot_name,
        icon_url: config.discord.bot_icon,
      }
    }]
  }

  // Prepare the content of the message.
  const content : string[] = [];

  // Include log data and ID.
  data.tags = {
    ...data.tags,
    id,
  }

  content.push(JSON.stringify(data.tags, undefined, '  '));
  

  // Add the message content to the request body.
  requestBody.content = `\`\`\`${content.join('\n\n')}\`\`\``;

  // Include metadata as fields in the Discord message.
/*   if (data.meta) {
    Object.keys(data.meta).forEach(key => {
      requestBody.embeds[0].fields.push({
        name: key,
        value: data.meta![key]
      });
    });
  } */

  try {
    // Send the log message to Discord via a webhook.
    await fetch(env_server.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
  } catch (err: any) {
    // Handle any errors that occur during the message sending process.
    console.log('Discord Server can not be notified')
    console.log(err.message)
  }
}

