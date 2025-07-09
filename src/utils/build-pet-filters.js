function buildPetArrayFilters(filters) {
  const { preferHomeWith, preferHomeWithout, health, ...restFilters } = filters;

  const filter = { ...restFilters };

  if (preferHomeWith) {
    filter.preferHomeWith = { $all: preferHomeWith };
  }

  if (preferHomeWithout) {
    filter.preferHomeWithout = { $all: preferHomeWithout };
  }

  if (health) {
    filter.health = { $all: health };
  }

  return filter;
}

module.exports = buildPetArrayFilters;
