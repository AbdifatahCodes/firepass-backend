import { getLoginItemRepository } from '../../Type-ORM/repository/RepositoryProvider';
import { validateUserToken } from '../utils/tokenUtils';

export const loginItemResolvers = {
  Query: {
    // Define your query resolvers here
    getAllLoginItems: async (_, { token, uuid }) => {
      validateUserToken(token);

      const loginItemRepository = getLoginItemRepository();
      const allLogins = await loginItemRepository.findBy({uuid});

      return allLogins;
    },
  },
  Mutation: {
    createLoginItem: async (_, { token, loginItemInput }) => {
      validateUserToken(token);

      const loginItemRepository = getLoginItemRepository();
      const newLoginItem = loginItemRepository.create({
        ...loginItemInput,
        creationDate: new Date(),
        revisionDate: new Date(),
        lastUsed: new Date()
      });

      await loginItemRepository.save(newLoginItem);
      return newLoginItem;
    },
    // Define other mutations here
  }
};
