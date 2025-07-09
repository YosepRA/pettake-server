const { GraphQLError } = require('graphql');

function handleGraphQLAuthError(type) {
  switch (type) {
    case 'unauthenticated':
      throw new GraphQLError('You are not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {
            status: 401,
          },
        },
      });

    case 'forbidden':
      throw new GraphQLError('You are not authorized for this operation', {
        extensions: {
          code: 'FORBIDDEN',
          http: {
            status: 403,
          },
        },
      });

    default:
      throw new GraphQLError('You are not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {
            status: 401,
          },
        },
      });
  }
}

module.exports = handleGraphQLAuthError;
