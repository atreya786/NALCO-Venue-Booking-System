import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import connectDB from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const pool = await connectDB();

        const result = await pool?.request().input("email", credentials.email)
          .query(`
            SELECT * FROM Users
            WHERE email = @email
          `);

        const user = result?.recordset[0];

        if (!user) {
          return null;
        }

        if (user.password_hash !== credentials.password) {
          return null;
        }

        return {
          id: user.user_id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role as string;

      console.log(session);

      return session;
    },
  },
  

  secret: process.env.AUTH_SECRET,
});
