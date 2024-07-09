import { signIn } from '@/app/(auth)/apis/auth.api';
import { getUserProfile } from '@/app/(auth)/apis/user.api';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { cookies } from 'next/headers';

const authOptions: NextAuthOptions = {
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
    async jwt({ token, account, user }: any) {
      if (user) {
        token.user = user;
      }

      if (account) {
        token.account = account;
        account.access_token &&
          cookies().set('access_token', account.access_token);
      }
      return token;
    },

    async session({ session, token }: any) {
      session.token = token?.account?.access_token ?? '';
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
