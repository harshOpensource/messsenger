import { Conversation, PrismaClient, User } from "@prisma/client";
import {
  CreateUserResponse,
  getConversationByIdResponse,
  getMessagesResponse,
} from "../types";

import bcrypt from "bcrypt";
import getSession from "../getSession";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

const conversationsResolvers = {
  Query: {
    getConversationById: async function getConversationById(
      _: any,
      args: {
        conversationId: string;
      }
    ): Promise<getConversationByIdResponse> {
      const { conversationId } = args;
      try {
        const res = await prisma.conversation.findUnique({
          where: {
            id: conversationId,
          },
          include: {
            users: true,
          },
        });

        if (!res) {
          return {
            error: "conversation not found!",
          };
        }

        return {
          conversation: res,
        };
      } catch (error) {
        return {
          error: "Something went wrong, Try Again!",
        };
      }
    },

    getConversations: async function getConversations(): Promise<
      Conversation[]
    > {
      try {
        const session: any = await getServerSession(authOptions);
        const conversations = await prisma.conversation.findMany({
          orderBy: {
            lastMessageAt: "desc",
          },
          where: {
            userIds: {
              has: session?.user?.id,
            },
          },
          include: {
            users: true,
            messages: {
              include: {
                sender: true,
                seen: true,
              },
            },
          },
        });

        return conversations;
      } catch (error) {
        return [];
      }
    },
  },
};

export default conversationsResolvers;
