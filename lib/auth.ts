import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import sql from "mssql";

import connectDB from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},

        password: {},
      },

      async authorize(credentials) {
        try {
          // console.log("Credentials:", credentials);

          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const pool = await connectDB();

          if (!pool) {
            console.log("Pool not found");
            return null;
          }

          const result = await pool
            .request()
            .input("email", sql.VarChar, credentials.email as string).query(`
            SELECT *
            FROM Users
            WHERE email = @email
         `);

          // console.log("Result:", result?.recordset);

          const user = result.recordset[0];

          // console.log("User:", user);

          if (!user) {
            console.log("User not found");
            return null;
          }

          // console.log("DB Password:", user.password_hash);
          // console.log("Entered Password:", credentials.password);

          if (user.password_hash !== credentials.password) {
            console.log("Password mismatch");
            return null;
          }

          console.log("LOGIN SUCCESS");

          return {
            id: user.user_id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize Error:", error);

          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.role = token.role as string;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
