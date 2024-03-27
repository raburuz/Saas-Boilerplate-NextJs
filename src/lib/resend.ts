/* LIBRARIES */
import { Resend } from 'resend';

/* CONFIG */
import { config } from '@/config';

/* ENV */
import { env_server } from '@/env/server.mjs';

const resend = new Resend(env_server.RESEND_API_KEY);

interface ISendEmail {
  email: string,
  subject: string,
  react: any,
  isMarketing?: boolean
}

export const sendEmail = async ( { email, subject, react, isMarketing = false }: ISendEmail ) => {

  if (!resend) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.",
    );
    return Promise.resolve();
  }

  await resend.emails.send({
    from: isMarketing ? config.resend.from_marketing : config.resend.from_no_reply,
    to: email,
    subject,
    react,
    reply_to: config.resend.support,
  });
}