import gql from 'graphql-tag'

export const GET_ATTRACTION = gql`
  query merchants(
    $category: String!
    $lon: String!
    $lat: String!
    $walking: Boolean!
  ) {
    merchants(category: $category, lon: $lon, lat: $lat, walking: $walking) {
      id
      name
      address
      numTransactions
      avgAmount
      distance
    }
  }
`
