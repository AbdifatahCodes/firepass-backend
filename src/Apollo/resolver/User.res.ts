import bcrypt from 'bcrypt';
import validator from 'validator';
import { getUserRepository } from '../../Type-ORM/repository/RepositoryProvider';
import { createNewToken, validateUserToken } from '../utils/tokenUtils';

export const userResolvers = {
  Query: {
      // As per your requirement, there's no query to fetch all users.
      loginUser: async (_, { email, password }) => {
        const userRepository = getUserRepository();

        // Find user by email
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found.');
        }

        // Check if the password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password.');
        }

        // Generate JWT token
        const token = createNewToken(user.uuid);

        // Return the user info with token, excluding password
        const { password: passwordExcluded, ...userInfo } = user;
        return { ...userInfo, token };
    },
    validateToken: async (_, { token }) => {
      try {
        validateUserToken(token);
        return true; // Token is valid
      } catch (error) {
        return false; // Token is invalid
      }
    },
  },
  Mutation: {
      createUser: async (_, { email, password }) => {
          const userRepository = getUserRepository();

          // Input Validation
          if (!validator.isEmail(email)) {
              throw new Error('Invalid email format.');
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Check if the email already exists
          const existingUser = await userRepository.findOne({ where: { email } });
          if (existingUser) {
              throw new Error('Email already in use.');
          }

          // Create a new user
          const newUser = userRepository.create({
              email,
              password: hashedPassword
          });

          // Save the new user
          await userRepository.save(newUser);

          // Exclude password from the response
          const { password: passwordExcluded, ...userInfo } = newUser;
          return userInfo;
      }
  }
};