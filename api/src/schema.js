const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  enum PetType {
    CAT
    DOG
  }
type User {
  id: ID!
  username: String!
  pets: [Pet]!
}
type Pet {
  id: ID!
  type: PetType!
  name: String!
  owner: User!
  img: String!
  createdAt: Int!
}
input NewPetInput {
  name: String!
  type: PetType!
}
input PetsInput {
  type: PetType
}
type Query {
  user: User!
  pets(input: PetsInput): [Pet]!
  pet(id: ID!): Pet!
}
type Mutation {
  addPet(input: NewPetInput!): Pet!
}
`;

module.exports = typeDefs

// input types are just like normal types except they are for arguments to other fields
//useful to pass arguments to fields that return array types

// Mutations are a type on a schema that defines operations that clients can perform to mutate data (create, update, delete)

// define mutation type on the schema
// add fields for mutation type
// add arguments for mutation fields


// ENUMS are a set of discrete values that can be used in place of scalars
// an enum field must resolve to one of the values in the enum
// great for limiting a field to only a few different options

// interfaces are used for if you have very similar items that only differ slightly

// UNIONS - like interfaces but without any defined common fields
// for things that have no relation, don't have any common fields but you want to do one query and get all of them back


// Note on the Pet that we include the owner field that has type user but in the database the pets don't have an owner and so we must write a resolver for that relationship as the database can't resolve it for us

// we must add a field level resolver - that is any resolver for a field that is on a type other than a mutation or query

// Query and mutation are top level resolver, they get resolved first and everything else (field level resolvers) gets resolved afeter them




