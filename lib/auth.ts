import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  logger: {
    level: 'debug',
    disabled: false,
    disableColors: false,
  },

  // Built-in social providers (commented out - using genericOAuth instead)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    cognito: {
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      domain: process.env.COGNITO_DOMAIN as string, // e.g. "your-app.auth.us-east-1.amazoncognito.com"
      region: process.env.COGNITO_REGION as string, // e.g. "us-east-1"
      userPoolId: process.env.COGNITO_USERPOOL_ID as string,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
      strategy: 'jwe', // can be "jwt" or "compact"
      refreshCache: true, // Enable stateless refresh
    },
  },

  account: {
    // updateAccountOnSignIn: true,
    updateAccountOnSignIn: false,
    storeStateStrategy: 'cookie',
    storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
  },

  plugins: [],
});
