# Thinking in graphs

Your API is no longer a predefined list of operations that always returns the same shapes.

instead your API is a set of nodes that know how to resolve themselves and have links to other nodes. This allows a client to ask for nodes and then follow those links to get related nodes

# Client Side Notes

use the /graphql route to access the graph ql playground

## operation names

Unique names for your client side query and mutation operations
 e.g. `query` {} or `mutation` {}

## Apollo Client 

Encapsulates HTTP Logic used to interact with a graphql API. Doubles as a client side state management alternative aswell. If you graphql API is also an apollo server it provides some extra features.

## Storing data from your API

All nodes are stored flat by a unique ID
