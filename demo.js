const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

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

// resolvers
// you have to name the resolvers the same as what is in your type definition
// A resolvers job is to return something that looks like your Query
// Your query is specifying that a User should be returned and we know what a user looks like because of the type User above it
const resolvers = {
  Query: {
    me() {
      return {
        email: "yoda@masters.com",
        avatar: "http://yoda.png",
        friends: []
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(() => console.log("on port 4000"));
