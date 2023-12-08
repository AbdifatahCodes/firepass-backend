import { userResolvers } from './User.res';
import { loginItemResolvers } from './LoginItem.res';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...loginItemResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...loginItemResolvers.Mutation,
  }
};
