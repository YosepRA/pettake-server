const { GraphQLError } = require('graphql');
const cloudinary = require('cloudinary').v2;

const {
  utils: { handleGraphQLAuthError },
} = require('@Features/user/index.js');
const { promiseResolver, buildPetFilters } = require('@Utils/index.js');

const Pet = require('./pet-model.js');
const deletePetImages = require('./utils/delete-pet-images.js');

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
  const [pet, petQueryError] = await promiseResolver(
    Pet.findById(id).populate('author'),
  );

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
  if (!user) handleGraphQLAuthError('unauthenticated');

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

async function create(_, { pet: petArgs }, { user }) {
  if (!user) handleGraphQLAuthError('unauthenticated');

  const pet = { ...petArgs, author: user };

  const [newPet, createError] = await promiseResolver(Pet.create(pet));

  if (createError) {
    throw new GraphQLError(createError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  user.pets.push(newPet._id);
  await user.save();

  return newPet;
}

async function update(_, { id, petUpdates }, { user }) {
  if (!user) handleGraphQLAuthError('unauthenticated');

  let [pet, petQueryError] = await promiseResolver(Pet.findById(id));

  if (petQueryError) {
    throw new GraphQLError(petQueryError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  // Auhtorization whether this pet belongs to this user.
  if (!pet.author.equals(user._id)) handleGraphQLAuthError('forbidden');

  // Apply the updates.
  pet = Object.assign(pet, petUpdates);

  const savedPet = await pet.save();

  return savedPet;
}

async function remove(_, { id }, { user }) {
  if (!user) handleGraphQLAuthError('unauthenticated');

  const isPetBelongsToUser = user.pets.some((petId) => petId.toString() === id);

  if (!isPetBelongsToUser) {
    handleGraphQLAuthError('forbidden');
  }

  // Delete pet from database.
  const [deletedPet, deleteError] = await promiseResolver(
    Pet.findByIdAndDelete(id),
  );

  if (deletedPet === null) {
    throw new GraphQLError('No pet found', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (deleteError) {
    throw new GraphQLError(deleteError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  // Delete pet images from Cloudinary.
  const [result, imageDeleteError] = await promiseResolver(
    deletePetImages(deletedPet.images),
  );

  if (imageDeleteError) {
    throw new GraphQLError(imageDeleteError.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  // Delete pet from user's pet list.
  user.pets = user.pets.filter((petId) => petId.toString() !== id);

  await user.save();

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

module.exports = resolvers;
