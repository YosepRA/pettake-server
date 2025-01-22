const { GraphQLError } = require('graphql');

const { promiseResolver, buildPetFilters } = require('@Utils/index.js');

const Pet = require('./pet-model.js');

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

/* ======================= Queries ======================= */

async function list(
  _,
  { sort = '-createdAt', page = 1, limit = 10, ...restFilters },
) {
  const filter = buildPetFilters(restFilters);

  const paginationOptions = {
    sort,
    page,
    limit,
  };

  const [pets, petQueryError] = await promiseResolver(
    Pet.paginate(filter, paginationOptions),
  );

  if (petQueryError) {
    throw new GraphQLError(petQueryError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  return pets;
}

async function details(_, { id }) {
  const [pet, petQueryError] = await promiseResolver(Pet.findById(id));

  if (petQueryError) {
    throw new GraphQLError(petQueryError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  if (pet === null) {
    throw new GraphQLError('No pet found', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  return pet;
}

async function userPetList(
  _,
  { sort = '-createdAt', page = 1, limit = 10, ...restFilters },
  { user },
) {
  const filter = buildPetFilters(restFilters);

  filter._id = { $in: user.pets };

  const paginationOptions = {
    sort,
    page,
    limit,
  };

  const [pets, petQueryError] = await promiseResolver(
    Pet.paginate(filter, paginationOptions),
  );

  if (petQueryError) {
    throw new GraphQLError(petQueryError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  return pets;
}

/* ======================= Mutations ======================= */

async function create(_, { pet }) {
  return demoPet;
}

async function update(_, { pet }) {
  return demoPet;
}

async function remove(_, { id }) {
  return true;
}

/* ======================= Top Level Resolvers ======================= */

const resolvers = {
  Query: {
    petList: list,
    pet: details,
    userPetList,
  },
  Mutation: {
    petCreate: create,
    petUpdate: update,
    petDelete: remove,
  },
};

// module.exports = { list, details };

module.exports = resolvers;
