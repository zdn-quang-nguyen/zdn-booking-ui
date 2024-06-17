import { signIn } from '@/app/(auth)/apis/auth.api';
import { getUserProfile } from '@/app/(auth)/apis/user.api';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        await signIn(username, password);

        return await getUserProfile();
      },
    }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      // if (user) {
      //   token.user = user;
      // }

      // if (account) {
      //   token.account = account;
      // }

      // if (profile) {
      //   token.profile = profile;
      // }

      console.log('🚀 ~ jwt ~ token:', token);
      return token;
    },
    // async session(session, user) {
    //   session.user = user.user;
    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
