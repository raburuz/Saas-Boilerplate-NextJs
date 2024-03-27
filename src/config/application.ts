import { dashboardConfig } from "./dashboard";
import { IApplicationConfiguration } from "./models";

export const config: IApplicationConfiguration = {
  app: {
    name: "Founder", 
    domain: "founder.com",
    owner: "Jean Ram",
    version: "0.0.1",
  },
  hasOnboardingPage: true,
  url: {
    frontend: {
      development: "http://localhost:3000",
      production: "https://founder.com",
      test: "http://localhost:3000",
    }, 
    backend: {
      development: "http://localhost:3000",
      production: "https://founder.com",
      test: "http://localhost:3000",
    }, 
  },
  resend: {
    from_marketing: "Jean at Founder <jean@your_domain.com>",
    from_no_reply: "Founder <noreply@your_domain.com>",
    support: "jeanpablo@your_domain.com", 
  },
  discord: {
    bot_name: "Founder Logger",
    bot_icon: "https://nextjs.org/favicon.ico",
  },
  next_auth: {
    sign_in_url: "/auth/login",
    error_url: "/auth/login",
    auth_callback_url: "/dashboard",
    logout_callback_url: "/auth/login",
  },
  stripe:{
    success_payment_url: `/settings/billing?${dashboardConfig.alerts.queryKey}=payment_success`,
    cancel_payment_url: `/settings/billing?${dashboardConfig.alerts.queryKey}=payment_failed`,
  },
  marketing:{
    seo:{
      title: "Founder, the ultimate NextJs starter kit",
      description: "Unlock rapid product development with our Next.js boilerplate! Supercharge your project and get it in front of customers quickly. Start building today!",
      category:"Developer Application",
      keywords: "founder, react, nextjs boilerplate, nextjs starterkit",
      theme_color:"#000000",
    },
    social_media:{
      x:{
        username: "@arkift_r",
        link: "https://x.com/arkift_r",
      },
      website:{
        name: "Jean Ram",
        domain: "https://arkift.com"
      }
    },
  }
} as const;
