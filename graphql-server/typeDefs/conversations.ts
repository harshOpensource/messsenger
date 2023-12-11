import { gql } from "graphql-tag";

const conversationsTypeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    image: String!
    hashedPassword: String!
    conversationIds: [String!]
    seenMessageIds: [String!]
  }

  scalar Date

  type Message {
    id: String!
    body: String!
    createdAt: String!
    senderId: String!
    conversationId: String!
    image: String
    seenIds: [String!]
  }

  type Conversation {
    id: String!
    createdAt: Date
    lastMessageAt: Date
    name: String!
    isGroup: Boolean!
    messagesIds: [String!]
    userIds: [String!]
  }

  type getConversationByIdResponse {
    error: String!
    conversation: Conversation!
  }

  type Query {
    getConversationById(conversationId: String!): getConversationByIdResponse!
    getConversations: [Conversation!]!
  }
`!;

export default conversationsTypeDefs;
