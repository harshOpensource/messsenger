import { gql } from "@apollo/client";

export default {
  Mutation: {
    createUser: gql`
      mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
          success
          error
        }
      }
    `,
  },
};
