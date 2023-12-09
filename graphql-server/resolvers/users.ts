import { PrismaClient, User } from "@prisma/client";
import { CreateUserResponse } from "../types";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userResolvers = {
  Query: {},

  Mutation: {
    createUser: async function createUser(
      _: any,
      args: {
        name: string;
        email: string;
        password: string;
      }
    ): Promise<CreateUserResponse> {
      const { name, email, password } = args;

      try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user_find = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (user_find) {
          return {
            error: "User already exists!",
          };
        } else {
          const user = await prisma.user.create({
            data: {
              email,
              name,
              hashedPassword,
            },
          });

          return { success: true };
        }
      } catch (error) {
        return {
          error: "Something went wrong, Try Again!",
        };
      }
    },
  },
};

export default userResolvers;
