const { faker } = require('@faker-js/faker');

const { pickMultipleItems, promiseResolver } = require('@Utils/index.js');

const Pet = require('./pet-model.js');

async function deletePets(userId) {
  const [result, error] = await promiseResolver(
    Pet.deleteMany({ author: userId }),
  );

  if (error) {
    console.log('Pet delete error.', error);

    return false;
  }

  console.log('Pet delete count:', result);

  return true;
}

function createPets(petAmount, user) {
  const breeds = [
    'Irish Terrier',
    'Georgian Shepherd',
    'Leonberger',
    'Dogo Guatemalteco',
    'Cretan Hound',
  ];
  const ages = ['Puppy', 'Young', 'Mature'];
  const genders = ['Male', 'Female'];
  const coatLengths = ['Short', 'Medium', 'Long'];
  const preferHomes = ['Other dogs', 'Other cats', 'Children'];
  const healths = ['Spayed/Neutered', 'Vaccinated'];
  const images = [
    {
      publicId: 'pettake-demo-image-01',
      url: 'https://placehold.co/600x400?text=PetTake+Demo+Image+01',
    },
    {
      publicId: 'pettake-demo-image-02',
      url: 'https://placehold.co/600x400?text=PetTake+Demo+Image+02',
    },
    {
      publicId: 'pettake-demo-image-03',
      url: 'https://placehold.co/600x400?text=PetTake+Demo+Image+03',
    },
    {
      publicId: 'pettake-demo-image-04',
      url: 'https://placehold.co/600x400?text=PetTake+Demo+Image+04',
    },
    {
      publicId: 'pettake-demo-image-05',
      url: 'https://placehold.co/600x400?text=PetTake+Demo+Image+05',
    },
  ];

  // Pet generation

  const pets = [];

  for (let n = 0; n < petAmount; n += 1) {
    const pet = {
      name: faker.person.firstName(),
      breed: faker.helpers.arrayElement(breeds),
      age: faker.helpers.arrayElement(ages),
      gender: faker.helpers.arrayElement(genders),
      coatLength: faker.helpers.arrayElement(coatLengths),
      preferHomeWith: pickMultipleItems(
        Math.floor(Math.random() * preferHomes.length + 1),
        preferHomes,
      ),
      preferHomeWithout: pickMultipleItems(
        Math.floor(Math.random() * preferHomes.length + 1),
        preferHomes,
      ),
      health: [faker.helpers.arrayElement(healths)],
      images: pickMultipleItems(
        Math.floor(Math.random() * images.length + 1),
        images,
      ),
      description: faker.lorem.words(30),
      createdAt: faker.date.recent({ days: 30 }),
      author: user,
    };

    pets.push(pet);
  }

  return pets;
}

async function savePets(pets) {
  const [result, error] = await promiseResolver(Pet.insertMany(pets));

  if (error) {
    console.log('Pet save error.', error);

    return undefined;
  }

  return result;
}

async function main(petAmount, oldUser, newUser) {
  await deletePets(oldUser._id);

  const pets = createPets(petAmount, newUser);

  const savedPets = await savePets(pets);

  return savedPets;
}

module.exports = main;
