const { faker } = require('@faker-js/faker');

function pickMultipleItems(amount, arr) {
  const randomizedItems = [];

  for (let n = 0; n < amount; n += 1) {
    let randomItem;
    // Preventing the same data to get inserted more than once.
    do {
      randomItem = faker.helpers.arrayElement(arr);
    } while (randomizedItems.includes(randomItem));

    randomizedItems.push(randomItem);
  }

  return randomizedItems;
}

module.exports = pickMultipleItems;
