import { User } from "@prisma/client";

export interface CreateUserResponse {
  success?: boolean;
  error?: string;
}

export interface getUserResponse {
  error?: string;
  user?: User;
}
