const { promiseResolver } = require('@Utils/index.js');

const User = require('./user-model.js');

async function main() {
  const testUser = {
    username: 'testjoe',
    email: 'joe@mail.com',
    password: 'joe',
    name: 'John Smith',
    phone: '+1 123 1234',
    address: '3434 Bubby Drive Taylor, TX 76574',
  };

  // Delete old user 'testjoe' from database.
  const oldUserQueryFilter = { username: testUser.username };
  const oldUser = await User.findOne(oldUserQueryFilter);
  await User.deleteOne(oldUserQueryFilter);

  // Register a new 'testjoe'.
  const [newUser, error] = await promiseResolver(
    User.register(testUser, testUser.password),
  );

  if (error) {
    console.log(error);

    return undefined;
  }

  return { oldUser, newUser };
}

module.exports = main;
