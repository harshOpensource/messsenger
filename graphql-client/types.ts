export interface CreateUserVariables {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserData {
  createUser: {
    success: boolean;
    error: string;
  };
}
