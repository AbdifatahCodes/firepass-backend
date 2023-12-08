// import { AppDataSource } from "../data-source";
// import { User } from "../entity/User";
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import validator from 'validator';
import { getUserRepository } from '../../Type-ORM/repository/RepositoryProvider';

export async function setupSeeds() {
  console.log("Inserting a new user into the database...");

  const email = "example@email.com";
  const password = "12345678"

  const userRepository = getUserRepository();

  // const deltable = await userRepository.delete({});
  // console.log("Deleted : ", deltable);
  
  // Input Validation
  if (!validator.isEmail(email)) {
      throw new Error('Invalid email format.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the email already exists
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
      console.log('Seed account already present');
      return;
  } else {
    // Create a new user
    const newUser = userRepository.create({
        email,
        password: hashedPassword
    });

    // Save the new user
    await userRepository.save(newUser);

    console.log("Saved a new user with id: " + newUser.id);
  }

  console.log("Loading users from the database...");
  const allUsers = await userRepository.find();
  console.log("Loaded users: ", allUsers);

}