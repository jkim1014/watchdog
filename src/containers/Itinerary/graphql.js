import gql from 'graphql-tag';

const GET_ITINERARIES = gql`
    query itinerary {
        itinerary {
            id
            name
            merchants {
                id
                name
                address
                numTransactions
                avgAmount
            }
            date
            budget
        }
    }
`

const GET_ITINERARY_BY_ID = gql`
    query itineraryById($id: ID!) {
        itineraryById(id: $id) {
            id
            name
            merchants {
                id
                name
                address
                numTransactions
                avgAmount
            }
            date
            budget
        }
    }
`


export { GET_ITINERARIES, GET_ITINERARY_BY_ID }