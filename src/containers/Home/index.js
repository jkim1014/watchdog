import React, { Component } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { withRouter } from 'react-router-dom'
import { Wrapper, Wrapper2, Wrapper3, Logo } from './styles'
import Button from '@material-ui/core/Button'
import { GET_ITINERARIES } from '../Itinerary/graphql'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Query } from 'react-apollo'
import store from 'store'
import Pic from '../../media/WayGo.png'

class Home extends Component {
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
    this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ latitude: latLng.lat })
        this.setState({ longitude: latLng.lng })
      })
      .catch(error => console.error('Error', error))
  }

  handleClick = (event, id) => {
    this.props.history.push({pathname: '/itinerary', state: id})
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Logo src={Pic} />
          <Wrapper3>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item'
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer', borderColor: '#2f3e9e' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer', borderColor: '#2f3e9e' }
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          </Wrapper3>
          <Wrapper2>
            <Button
              onClick={() => {
                store.set('geo', {
                  longitude: this.state.longitude,
                  latitude: this.state.latitude
                })
                this.props.history.push('/budget')
              }}
              variant="contained"
              color="primary"
            >
              Explore!
            </Button>
          </Wrapper2>
        </Wrapper>

        <Query query={GET_ITINERARIES}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading'
            if (error) return 'Error!'
            console.log(data)
            const itineraries = data.itinerary.sort((a, b) => {
              return new Date(b.date) - new Date(a.date)
            })

            return (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Num. Items</TableCell>
                    <TableCell>Budget</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itineraries.map(i => {
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, i.id)}
                        key={i.id}
                      >
                        <TableCell component="th" scope="row">
                          {i.name}
                        </TableCell>
                        <TableCell>{new Date(i.date).toDateString()}</TableCell>
                        <TableCell>{i.merchants.length}</TableCell>
                        <TableCell>{'$' + i.budget}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withRouter(Home)
