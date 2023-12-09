import { gql } from "graphql-tag";

const userTypeDefs = gql`
  type User {
    id: String
  }
  type CreateUserResponse {
    success: Boolean
    error: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ): CreateUserResponse!
  }
`;

export default userTypeDefs;
