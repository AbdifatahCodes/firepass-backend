import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { LoginItem } from '../entity/LoginItem';

export const getUserRepository = () => {
    return AppDataSource.getRepository(User);
};

export const getLoginItemRepository = () => {
  return AppDataSource.getRepository(LoginItem);
};
