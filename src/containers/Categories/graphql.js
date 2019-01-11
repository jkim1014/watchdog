import gql from 'graphql-tag'

export const CREATE_ITINERARY = gql`
  mutation createItinerary($input: CreateInput!) {
    createItinerary(input: $input) {
      error
      success
      itinerary {
        id
        name
        date
        budget
      }
    }
  }
`
