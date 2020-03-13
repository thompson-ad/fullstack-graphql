import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

// make a query
const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`

// make a mutation
// operation name is CreateAPet
// decalring a variable by the name of newPet and setting it's type to NewPetInput! which is required
// we are going to run the addPet mutation and satisfy it's input argument and set that to $newPet
const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`
export default function Pets () {
  const [modal, setModal] = useState(false)
  // the useQuery Hook takes a GraphQL Query in as an arg
  // the first thingit gets back is the response from the server
  // lodaing is a boolean
  // data is the entire response object
  const {data, loading, error} = useQuery(ALL_PETS)
  // define a mutation
  // the newPet object has the data, loading and error properties on it
  // note that the nelow does not actually run the mutation
  // you get back an array where the first argument is the function that you can use to call the mutation
  // This is not the same as useQuery that makes a network call when you define it
  // use mutation can take an optional second argument that is an object and on that object you can provide a method called update that is going to be called after the mutation is processed 
  // it gives you complete control over the cache to update it based on teh mutation results
  // the update method receives 2 arguments, 1 is going to be a cache that the apollo client is using internally, 2 is the response that your server returned
  // then you need to find any query that needs to know about the update that you just performed
  // We have a query that displays a list of pets and one that just created a pet so that query needs to know about that new pet
  // so this updates the cache, causes a re-render and updates what is shown on the page
  // 
  const [createPet, newPet] = useMutation(NEW_PET, {
    update(cache, {data: {addPet}}) {
      const data = cache.readQuery({query: ALL_PETS})
      cache.writeQuery({
        query: ALL_PETS,
        data: {pets: [addPet, ...data.pets]}
      })
    }
  })
  const onSubmit = input => {
    setModal(false)
    // any mutation function will take an object of properties
    // the one we want is variables
    // the input in this case is formatted the exact way that we need our variables to be passed
    createPet({
      variables: {newPet: input}
    })
  }

  if(loading || newPet.loading) {
    return <Loader />
  }

  if(error || newPet.error) {
    console.error(error)
    return <p>Error!</p>
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets}/>
      </section>
    </div>
  )
}
