require('module-alias/register');

const { seeder: userSeeder } = require('@Features/user/index.js');
const { seeder: petSeeder } = require('@Features/pet/index.js');

const mongoConnect = require('./mongo-connect.js');

const petAmountArg = process.argv[2] ? parseInt(process.argv[2], 10) : 23;
const mongoUrl = process.argv[3] || 'mongodb://127.0.0.1:27017/PetTake';

const db = mongoConnect(mongoUrl);

async function main() {
  const { oldUser, newUser } = await userSeeder();
  const pets = await petSeeder(petAmountArg, oldUser, newUser);

  newUser.pets = pets;
  await newUser.save();

  console.log(
    `Successfully generated ${pets.length} pets with user ID "${newUser._id}"`,
  );

  return db.close();
}

main();
