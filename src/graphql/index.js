const path = require('path');
const { readFile } = require('fs/promises');

const { ApolloServer } = require('@apollo/server');
const { merge } = require('lodash');

const { resolvers: petResolvers } = require('@Features/pet/index.js');
const GraphQLDate = require('@GraphQL/scalars/graphql-date.js');

async function loadSchema() {
  const schemaPaths = [
    '../features/pet/pet-schema.graphql',
    '../features/user/user-schema.graphql',
  ];

  const readPromises = schemaPaths.map((schemaPath) =>
    readFile(path.resolve(__dirname, schemaPath), 'utf-8'),
  );

  return Promise.all(readPromises);
}

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Query: {
    petList: petResolvers.list,
    pet: petResolvers.details,
  },
  Mutation: {},
  GraphQLDate,
};

async function startApolloServer() {
  const [Pet, User] = await loadSchema();

  const schemas = [Query, Pet, User];

  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
  });

  await server.start();

  return server;
}

module.exports = startApolloServer;
