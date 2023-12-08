// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: ID!
    uuid: String!
    email: String!
    token: String
  }

  type LoginItem {
    id: ID!
    uid: String!
    uuid: String!
    creationDate: String!
    revisionDate: String!
    lastUsed: String!
    domain: String!
    username: String!
    password: String!
    uri: String!
    notes: String!
    movedToTrash: Boolean
  }
  
  input LoginItemInput {
    uuid: String!
    domain: String!
    username: String!
    password: String!
    uri: String!
    notes: String!
    creationDate: String!
    revisionDate: String!
    lastUsed: String!
    movedToTrash: Boolean
  }
  
  type Query {
    loginUser(email: String!, password: String!): User
    getAllLoginItems(token: String!, uuid: String!): [LoginItem]
    validateToken(token: String!): Boolean
  }
  
  type Mutation {
    createUser(email: String!, password: String!): User
    createLoginItem(token: String!, loginItemInput: LoginItemInput!): LoginItem
  }
  
`;