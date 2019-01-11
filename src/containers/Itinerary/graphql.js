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

const GET_ITINERARY_BY_DATE = gql`
    query itinerary($date: String!) {
        itinerary(date: $date) {
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


export { GET_ITINERARIES, GET_ITINERARY_BY_DATE }