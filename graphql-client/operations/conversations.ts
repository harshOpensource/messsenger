import { gql } from "@apollo/client";

export default {
  Query: {
    getConversations: gql`
      query getConversations {
        getConversations {
          id
          createdAt
          lastMessageAt
          name
          isGroup
          messagesIds
          userIds
        }
      }
    `,
  },
};
