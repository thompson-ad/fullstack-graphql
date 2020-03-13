# Optimistic UI

your UI does not wait until afer a mutation operation to update itself. Instead, it anticipates the response from the API and proceeds as if the API call was sync.

The API reponse replaces the generated one. This give the illision of your app being fast af.