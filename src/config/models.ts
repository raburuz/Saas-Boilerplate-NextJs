/* LIBRARIES */
import { UserRole } from "@prisma/client";

/* 
 * NOTE! Usage: This information will be shown in client, don't use with sensitive information
*/

/* APPLICATION */
/**
 * Represents the configuration for an application.
 * @interface
 */
export interface IApplicationConfiguration {
  /**
   * Information about the application.
   * @type {Object}
   */
  app: {
    /**
     * The name of the application.
     * @type {string}
     */
    name: string;

    /**
     * The domain of the application.
     * @type {string}
     */
    domain: string;

    /**
     * The owner of the application.
     * @type {string}
     */
    owner: string;

    /**
     * The version of the application.
     * @type {string}
     */
    version: string;
  };

  /**
   * Indicates whether the application has an onboarding page.
   * @type {boolean}
   */
  hasOnboardingPage: boolean;

  /**
   * URLs for different parts of the application.
   * @type {Object}
   */
  url: {
    /**
     * Frontend URLs for different environments.
     * @type {Object}
     */
    frontend: {
      /**
       * The development frontend URL.
       * @type {string}
       */
      development: string;

      /**
       * The production frontend URL.
       * @type {string}
       */
      production: string;

      /**
       * The test frontend URL.
       * @type {string}
       */
      test: string;
    };

    /**
     * Backend URLs for different environments.
     * @type {Object}
     */
    backend: {
      /**
       * The development backend URL.
       * @type {string}
       */
      development: string;

      /**
       * The production backend URL.
       * @type {string}
       */
      production: string;

      /**
       * The test backend URL.
       * @type {string}
       */
      test: string;
    };
  };

  /**
   * Email addresses for sending different types of resends.
   * @type {Object}
   */
  resend: {
    /**
     * The email address for sending "from no-reply" emails.
     * @type {string}
     */
    from_no_reply: string;

    /**
     * The email address for sending marketing emails.
     * @type {string}
     */
    from_marketing: string;

    /**
     * The email address for sending support emails.
     * @type {string}
     */
    support: string;
  };

  /**
   * Configuration for NextAuth authentication.
   * @type {Object}
   */
  next_auth: {
    /**
     * The URL for signing in with NextAuth.
     * @type {string}
     */
    sign_in_url: string;

    /**
     * The URL for handling authentication errors with NextAuth.
     * @type {string}
     */
    error_url: string;

    /**
     * The callback URL for NextAuth authentication.
     * @type {string}
     */
    auth_callback_url: string;

    /**
     * The callback URL for NextAuth logout.
     * @type {string}
     */
    logout_callback_url: string;
  };

  /**
   * Configuration for a Discord bot.
   * @type {Object}
   */
  discord: {
    /**
     * The name of the Discord bot.
     * @type {string}
     */
    bot_name: string;

    /**
     * The icon for the Discord bot.
     * @type {string}
     */
    bot_icon: string;
  };

  /**
   * Configuration for Stripe payments.
   * @type {Object}
   */
  stripe: {
    /**
     * The URL for a successful payment with Stripe.
     * @type {string}
     */
    success_payment_url: string;

    /**
     * The URL for canceling a payment with Stripe.
     * @type {string}
    */
    cancel_payment_url: string;
  };

  /**
   * Configuration for marketing-related information.
   * @type {Object}
   */
  marketing: {
    /**
     * Search engine optimization (SEO) settings.
     * @type {Object}
     */
    seo: {
      /**
       * The title for SEO.
       * @type {string}
       */
      title: string;

      /**
       * The description for SEO.
       * @type {string}
       */
      description: string;

      /**
       * Keywords for SEO (optional).
       * @type {string}
       */
      keywords?: string;

      /**
       * The category for SEO (optional).
       * @type {string}
       */
      category?: string;

      /**
       * The theme color for the application.
       * @type {string}
       */
      theme_color: string;
    };

    /**
     * Social media information.
     * @type {Object}
     */
    social_media: {
      /**
             * Information for the 'x' social media platform.
      * @type {Object}
      */
      x: {
        /**
         * The username or handle for the 'x' platform.
         * @type {string}
         */
        username: string;

        /**
         * The link to the 'x' profile or page.
         * @type {string}
         */
        link: string;
      };

      /**
       * Information for the website on social media.
      * @type {Object}
      */
      website: {
        /**
         * The name of the website on social media.
         * @type {string}
         */
        name: string;

        /**
         * The domain or URL of the website on social media.
         * @type {string}
         */
        domain: string;
      };
    };
  };
}

/* DASHBOARD */
/**
 * Represents the configuration for a dashboard.
 * @interface
 */
export interface IDashboardConfiguration {
  /**
   * Links and menus based on user roles.
   * @type {Object}
   */
  links: {
    /**
     * Links and menus for each user role.
     * @type {Object}
     */
    [key in UserRole]: {
      /**
       * The main menu links for the user role.
       * @type {IDashboardLink[]}
       */
      menu: IDashboardLink[];

      /**
       * Submenu links for the user role.
       * @type {IDashboardLink[]}
       */
      submenu: IDashboardLink[];
    };
  };

  /**
   * Alerts configuration for specific query keys and user roles.
   * @type {Object}
   */
  alerts: {
    /**
     * The query key associated with the alerts.
     * @type {string}
     */
    queryKey: string;

    /**
     * Actions and alerts for each user role.
     * @type {Object}
     */
    actions: {
      /**
       * Alerts for a specific user role.
       * @type {IDashboardAlert[]}
       */
      [key in UserRole]: IDashboardAlert[];
    };
  };
}

/**
 * Represents an alert within a dashboard.
 * @interface
 */
interface IDashboardAlert {
  /**
   * The value associated with the alert.
   * @type {string}
   */
  queryValue: string;

  /**
   * The title of the alert.
   * @type {string}
   */
  title: string;

  /**
   * The description of the alert.
   * @type {string}
   */
  description: string;

  /**
   * The variant of the alert, which can be "default," "success," "destructive," "warning," or "info."
   * @type {"default" | "success" | "destructive" | "warning" | "info"}
   */
  variant: "default" | "success" | "destructive" | "warning" | "info";
}

/**
 * Represents a link within a dashboard.
 * @interface
 */
interface IDashboardLink {
  /**
   * The text or label for the link.
   * @type {string}
   */
  text: string;

  /**
   * The URL or href associated with the link.
   * @type {string}
   */
  href: string;

  /**
   * An optional icon element for the link.
   * @type {React.ReactNode | JSX.Element}
   */
  icon?: React.ReactNode | JSX.Element;
}
