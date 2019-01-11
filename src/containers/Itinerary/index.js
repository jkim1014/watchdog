import React, { Component } from 'react'
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_ITINERARY_BY_DATE } from './graphql'

class Itinerary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: '',
      latitude: '',
      address: '',
      merchants: []
    }
  }
  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ latitude: latLng.lat })
        this.setState({ longitude: latLng.lng })
      })
      .catch(error => console.error('Error', error))
  }
  render() {
    const columns = [{
      Header: 'Popularity',
      accessor: 'rank'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Distance',
      accessor: 'distance'
    }, {
      Header: 'Avg. Cost',
      accessor: 'avgAmount'
    }]

    return (
      <div>
        <Query  query={GET_ITINERARY_BY_DATE} variables={{ date }}>
          {({loading, error, data}) => {
            if (loading) return 'Loading'
            if (error) return 'Error'
            let merchants = data.merchants.sort((a, b) => {
              return b.numTransactions - a.numTransactions;
            });
            for (let i = 0; i < merchants.length; i++) {
              merchants[i]['rank'] = i+1;
            }
            return (
              <ReactTable
                data={merchants}
                columns={columns}
              />
            )
          }}
          
        </Query>
      </div>
    )
  }
}

export default withRouter(Home)
