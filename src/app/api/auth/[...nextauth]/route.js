import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post("YOUR_API_ENDPOINT", {
            email: credentials.email,
            password: credentials.password,
          });
          const user = response.data;

          if (user) {
            return user;
          }

          throw new Error("Invalid credentials");
        } catch (error) {
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  secret:"gCjYnhAuYDoiTLWVC3Wnp1POlnE+GfxelIv5wsLyzg0=",
  callbacks: {
    async signIn({ account, profile }) {
      return true; // You can add more logic here to conditionally allow or deny sign-in
    },
    async jwt({ token, account, profile }) {
      if (account) {
        // Include data from different providers
        token.name = profile?.name;
        token.email = profile?.email;
        token.userImageThumb = profile?.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          userImageThumb: token.userImageThumb,
        };
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secret: "YOUR_JWT_SECRET",
    encryption: true,
    secureCookie: true,
    cookieName: "next-auth-session",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
});

export { handler as GET, handler as POST };
