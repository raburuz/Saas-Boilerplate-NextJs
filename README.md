# NEXT TS STARTER KIT / APP ROUTER

This is a Next.js boilerplate that enables you to quickly launch your next project with subscription / one-time payment features.

* Easily configurable
* Avoid repetitive boilerplate code
* Eliminate the hassle of dealing with tedious setup
* Ship your project quickly, in days rather than months!

## Get started

1. In your terminal, run the following commands:

```

# Clone the repository
git clone --depth 1 https://github.com/raburuz/next-starter-kit-saas-subscription YOUR_APP_NAME

# Go to the code resource
cd YOUR_APP_NAME

# Remove the git remote origin
git remote remove origin

# Deleted the Git history
rm -rf .git

# Init a new local git repository
git init

# Install dependencies
npm install

```

## Configuring your project

To get started, you need to configure your environment variables.

### Local environment (development)

1. Rename .env.example to .env.local

```

cp .env.example .env.local
rm .env.example

```

2. Fill in the environment variables as instructed in the file.

```

NODE_ENV=development
RESEND_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_WEBHOOK_SECRET=
DISCORD_WEBHOOK_URL=

```

3. Open http://localhost:3000 to see your site.

```

# Exec Prisma Generate, Application in port 3000
npm run dev

# Exec Prisma Generate, Application in port 3000, Prisma Studio, Open React Email Server in port 8081
npm run dev:all

```

4. Note: If prisma doesn't recognize the database or some database model, or certain properties like index or unique fields, use the following command: 

```

npm run prisma:db_push_dev

npm run dev

```

### Configuring the Stripe Webhook in local environment (development)

Before configuring the Stripe Webhook in your local development environment, you need to download  ``` stripe.exe ``` to your computer. Follow the steps provided in the [Stripe CLI documentation](https://stripe.com/docs/stripe-cli)

Here are some useful Stripe CLI commands:
```
stripe login

# Forward events to your local development server
stripe listen --forward-to http://localhost:3000/api/stripe/webhook

```
Note: If you are using Windows, make sure to use CMD, not PowerShell.

### Configuring files
To configure your entire project, navigate to /src/config/file_name. Here, you can configure various aspects of your project, including:

Subscription Plan Settings

* Subscription plans with details such as plan name, type, popularity, pricing, description, and features.

Application Settings

* Name
* Domain
* Owner
* Version
* Onboarding page status
* Email settings for "from no-reply," "from marketing," and "support"
* NextAuth configuration for sign-in, error, auth callback, and logout URLs
* Discord bot details
* Stripe payment URLs
* Marketing and seo configuration
* Dashboard links

### Configuring Theme 

To config your theme we recommend following the shadcn resource [Config theme with shadcn](https://ui.shadcn.com/docs/theming)

## NextJS project structure

* /src/app → Pages [Next Docs](https://nextjs.org/docs/getting-started/project-structure)
* /src/app/api → API calls [Next Docs](https://nextjs.org/docs/getting-started/project-structure)
* /src/middleware → Next Middleware

* /src/boilerplate → All the code from the boilerplate
* /src/lib → Libraries helper functions (Stripe, Resend, Next Auth, etc.)
* /src/shadcn → [Shadcn Library](https://ui.shadcn.com/)
* /src/env → Config the vars environment and add validation for type-safe [Env T3](https://env.t3.gg/)

* /prisma/schema.prisma → Database models, [Prisma](https://www.prisma.io/)
* /emails → Marketing & Transactional emails, [React Email](https://react.email/)
* /content → All the markdown content that your blog, docs or any other resource need, [Next Contentlayer](https://contentlayer.dev/)

Feel free to add more folders and files as you like. There are no restrictions!

Note: If you need custom code or configuration in a specific file, such as a boilerplate file, a lib file, an env file, etc., feel free to make changes as needed!

## Stack

This project is built using the following technologies:

- Next 
- Next Auth
- Typescript 
- Tailwind 
- Prisma
- Zod
- React-Hook-Form
- Stripe 
- Shadcn
- React Email
- Resend
- Next-Contentlayer
- Env-t3 

