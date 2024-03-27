/* LIBRARIES */
import { User } from "@prisma/client";
import { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

/* BOILERPLATE */
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { sendLogToDiscord } from "@/lib/discord";
import { planConfig, Frequency, SubscriptionPlanKey  } from "@/lib/plans";

/* ENV */
import { env_server } from "@/env/server.mjs";

/* CONFIG */
import { config } from "@/config";

/* EMAILS */
import WelcomeEmail from "#/emails/welcome-email";
import MagicLink from "#/emails/magic-link";

// CONST
const IS_PRODUCTION_ENV = env_server.NODE_ENV === "production";
const mode = planConfig.mode;

export const nextAuthOptions: NextAuthOptions = {
  /* SESSION */
  session: { strategy: "jwt" },
  /* ADAPTERS */
  adapter: PrismaAdapter(prisma),
  /* HERE YOU CAN ADD NEW PROVIDERS */
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        if (env_server.NODE_ENV === "development") {
          console.log(`🔵 Login link: ${url}`);
          return;
        } else {
          try {
            await sendEmail({
              email: identifier,
              subject: `Your ${config.app.name} Login Link`,
              react: MagicLink({ url, email: identifier, appName:config.app.name }),
            });
          } catch (error) {
            console.log(`🔴 User with email address ${identifier} cannot receive the magic link.`)
            await sendLogToDiscord({ 
              channel: "auth",
              event: "magic link",
              icon: "🔒",
              description: `User with email address ${identifier} cannot receive the magic link.`, 
              type: "error",
              tags:{
                email: identifier
              }
            })
          }
        }
      },
    }),
    GoogleProvider({
      clientId: env_server.GOOGLE_CLIENT_ID,
      clientSecret: env_server.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
    /* Custom Backend? Check this first https://github.com/nextauthjs/next-auth/discussions/4394 */
    
  ],
  cookies: {
    sessionToken: {
      name: `${IS_PRODUCTION_ENV ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: IS_PRODUCTION_ENV ? `.${config.app.domain}` : undefined,
        secure: IS_PRODUCTION_ENV,
      },
    },
  },
  pages: {
    signIn: config.next_auth.sign_in_url,
    error: config.next_auth.error_url,
    //Here tou can add more url
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (!user.email) {
        return false;
      }
      if (account?.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { 
            name: true,
            image: true
          },
        });
        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && (!userExists.name || !userExists.image)) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              // @ts-ignore - this is a bug in the types, `picture` is a valid on the `Profile` type
              image: profile?.picture,
            },
          });
        }
      }
      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      
      if (!token.email ) {
        return {};
      }
      if (user) {
        token.user = user;
      }
      //Update user account in the client
      if (trigger === "update") {
        //Refresh with the new user data
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            email: true,
            name: true,
            isOnboardingComplete: true,
            // Add any additional data you want to update here
          }
        });
        // Update the name and email in the token
        token.name = refreshedUser?.name;
        token.email = refreshedUser?.email;
        // Push the new data inside the token's user object
        token.user = {
          // Preserve the old data
          ...(token as any).user,
          // Incorporate the new refreshed data
          ...refreshedUser,
        }
      }
      return token;
    },
    session: async ({ session, token }) => {

      //Here retrieve the user database information and update trigger
      const user = token.user as User;

      // Retrieve subscription information for the user
      if(mode === "subscription") {
        const userData = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            stripeCustomerId: true,
            subscription: {
              select:{
                plan: true,
                frequency: true,
                currentPeriodStart: true,
                currentPeriodEnd: true,
                cancelAtPeriodEnd: true,
              }
            },
          }
        });

        // Here you can push more properties to the session user
        session.user = {
        // @ts-ignore preserve the existing user ID
        id: token.sub,
        // Preserve any existing session user properties ( This information come from 0AUTH 2.0 standard )
        ...session.user, 
        // Add the new user information
        role: user.role,
        isOnboardingComplete: user.isOnboardingComplete,
        stripeCustomerId: userData?.stripeCustomerId ?? null,
        // Include the subscription details
        subscription: {
          plan: userData?.subscription?.plan as SubscriptionPlanKey,
          frequency: (userData?.subscription?.frequency as Frequency) ?? undefined,
          cancelAtPeriodEnd: userData?.subscription?.cancelAtPeriodEnd ?? undefined ,
          currentPeriodEnd: userData?.subscription?.currentPeriodEnd ?? undefined,
          currentPeriodStart: userData?.subscription?.currentPeriodStart ?? undefined,
        },
      };

      } else {
        const userData = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            stripeCustomerId: true,
            oneTime: {
              select:{
                product: true,
              }
            },
          }
        });

         // Here you can push more properties to the session user
         session.user = {
          // @ts-ignore preserve the existing user ID
          id: token.sub,
          // Preserve any existing session user properties ( This information come from 0AUTH 2.0 standard )
          ...session.user, 
          // Add the new user information
          role: user.role,
          isOnboardingComplete: user.isOnboardingComplete,
          stripeCustomerId: userData?.stripeCustomerId ?? null,
          // Include the subscription details
          oneTime: userData?.oneTime,
        };
      }

      return session;

    },
  },
  events: {
    async signIn(message) {
      const email = message.user.email as string;

      if (message.isNewUser) {
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            name: true,
            createdAt: true,
          },
        });
        // only send the welcome email if the user was created in the last 10s
        // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
        if ( user?.createdAt && new Date(user.createdAt).getTime() > Date.now() - 10000 ) {
          if (env_server.NODE_ENV === "development") {
            console.log(`🔵 Simulator -> SEND Welcome email!`);
          } else {
            await sendEmail({
              subject: `Welcome to ${config.app.name}`,
              email,
              react: WelcomeEmail({
                ownerAppName: config.app.owner,
                appName: config.app.name,
                email,
                name: user.name || null,
              }),
              isMarketing: true,
            });
          }
        }
      }
      //Update last login to send future emails to return or track inactive users
      await prisma.user.update({
        where: {
          email
        },
        data:{
          lastLoginAt: new Date(),
          loginCount: {
            increment: 1
          }
        },
        
      })
    },
    async createUser({ user }){
      //When create a new user this have a free account by default [You can  create your custom code here]
      if( mode === "subscription" ) {
        try {
          await prisma.subscription.create({
            data: {
              userId: user.id,
              plan: "free",
            }
          })
        } catch (error) {
          console.log(`🔴 Failed to create a subscription record for user with email: ${user.email}`)
          await sendLogToDiscord({ 
            channel: "stripe",
            event: "create subscription",
            icon: "💰",
            description: `Failed to create a subscription record for user with email: ${user.email}`, 
            type: "error",
            tags:{
              email: user.email
            }
          })
        }
      }
    }
  },  
};
