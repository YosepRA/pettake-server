const path = require('path');
const { readFile } = require('fs/promises');

const { ApolloServer } = require('@apollo/server');
const { merge } = require('lodash');

const { resolvers: petResolvers } = require('@Features/pet/index.js');
const GraphQLDate = require('@GraphQL/scalars/graphql-date.js');

function loadSchema(schemaPaths) {
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
  Query: {},
  Mutation: {},
  GraphQLDate,
};

async function resolveContext({ req }) {
  const context = {};

  if (req.isAuthenticated()) {
    context.user = req.user;
  }

  return context;
}

async function startApolloServer() {
  // Relative path to this 'index.js' file.
  const schemaPaths = [
    '../features/pet/pet-schema.graphql',
    '../features/user/user-schema.graphql',
  ];

  const [Pet, User] = await loadSchema(schemaPaths);

  const schemas = [Query, Pet, User];

  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers: merge(resolvers, petResolvers),
  });

  await server.start();

  return server;
}

module.exports = { startApolloServer, resolveContext };
