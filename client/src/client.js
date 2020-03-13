import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

//  Set up a link - this is like a network interface to access a graphql server
// this is going to point to the server

const link = new HttpLink({uri: 'http://localhost:4000/'})
const cache = new InMemoryCache();

// initialise the client
const client = new ApolloClient({
    link, 
    cache
})

export default client
