const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

// template tags - this will be compiled into an AST that can be understood by the server
// using the exclamation mark signifies to graphql that these are non-null and will always be there
const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Query {
    me: User!
  }
`;

//  the above is a query type 
// or "object types" as they are literally definitions of objects or nodes that your API can expose
// there is nothing special about the Query type other than Graphql expects it to be there.
// It is a Type on the schema that defines oeprations clients can perform to access data that resembles the shape of the other types in the schema
// the field "me" on the query type is ecpecting a value whos shape is the same as the User type

// resolvers
// you have to name the resolvers the same as what is in your type definition
// A resolvers job is to return something that looks like your Query
// Your query is specifying that a User should be returned and we know what a user looks like because of the type User above it

// Steps to making a query:
// create query type in the schema using SDL
// add fields to the query type
// create resolvers for those fields
const resolvers = {
  Query: {
    me() {
      return {
        email: 'yoda@masters.com',
        avatar: 'http://yoda.png',
        friends: []
      };
    }
  }
};

// Resolvers are functions that are responsible for returning values for fields that exist on types in a schema
// Resolvers execution is dependent on the incoming client query
// Graphql only has ONE ENDPOINT and the only thing that is dynamic is the query that you send out
// In the example above we created one resolver for the "me" field that returns those harcoded fields

// Resolvers names must match the exact field names on your schema types
// resolvers must return the value type declared for the matching field
// resolvers can be async and therefore you can retrieve data from just about anywhere

// Schema + Resolvers => Server
// at minimum, to create a server we need a query type with a field and a resolver for that field

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(() => console.log('on port 4000'));
