const demoPet = {
  _id: '123',
  name: 'Mikey',
  breed: 'Golden Retriever',
  age: 'Puppy',
  gender: 'Male',
  description: 'The always sweet Mikey the Retriever.',
  author: {
    _id: '123',
    username: 'testjoe',
    email: 'joe@mail.com',
    name: 'Joe Smith',
  },
};

async function list(_, { sort = '-createdAt', page = 1, ...restFilters }) {
  return {
    docs: [demoPet],
    totalDocs: 10,
    page: 1,
    totalPages: 10,
  };
}

async function details(_, { _id }) {
  return demoPet;
}

module.exports = { list, details };
