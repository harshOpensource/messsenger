import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import { ApolloWrapper } from "@/graphql-client/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger",
  description:
    "This is a Full Stack Messenger App designed with Next.js, TypeScript, GraphQL, and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </ApolloWrapper>
      </body>
    </html>
  );
}
