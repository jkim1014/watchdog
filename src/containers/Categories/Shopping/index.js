import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_SHOPPING } from './graphql'
import Button from '@material-ui/core/Button'
import store from 'store'

class Misc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0
    }
  }
  handleComplete = () => {
    const currentAmt = store.get('amount').amount
    store.set('amount', {amount: currentAmt - this.state.amount})
    this.props.history.push('/categories')
  }

  render() {
    return (
      <div>
        <div>Your budget: {store.get('amount').amount}</div>
        <div>Current options: {this.state.amount}</div>
        <Query query={GET_SHOPPING} variables={{ category: 's', lon: store.get('geo').longitude.toString(), lat: store.get('geo').latitude.toString(), walking: store.get('walking').walking}}>
          {({ loading, error, data }) => {
            if (loading) return 'loading'
            if (error) return 'error'
            console.log(store.get('geo'))
            console.log(store.get('walking').walking)
            console.log({longitude: '71'})
            console.log(data)
            return (data.merchants.map(merchant => {
              return <div>{merchant.name}</div>
            }))
          }}
        </Query>
        <Button onClick={this.handleComplete}>Complete</Button>
      </div>
    )
  }
}

export default withRouter(Misc)
