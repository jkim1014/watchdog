import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_FOOD } from './graphql'
import Button from '@material-ui/core/Button'
import store from 'store'
import Merchant from '../../../components/Merchant'

class Food extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      cart: []
    }
  }
  handleComplete = () => {
    const currentAmt = store.get('amount').amount
    const currentMerchants = store.get('merchants').merchants
    const updatedMerchants = currentMerchants.concat(this.state.cart)
    store.set('amount', {amount: currentAmt - this.state.amount})
    store.set('merchants', {merchants: updatedMerchants})
    this.props.history.push('/categories')
  }

  update = input => {
    this.setState(input)
  }

  render() {
    const compare = (a,b) => {
      if (a.numTransactions > b.numTransactions)
        return -1;
      if (a.numTransactions < b.numTransactions)
        return 1;
      return 0;
    }
    console.log(this.state.cart)
    return (
      <div>
        <div>Your budget: ${store.get('amount').amount}</div>
        <div>Current options: ${this.state.amount.toFixed(2)}</div>
        <Query query={GET_FOOD} variables={{ category: 'f', lon: store.get('geo').longitude.toString(), lat: store.get('geo').latitude.toString(), walking: store.get('walking').walking}}>
          {({ loading, error, data }) => {
            if (loading) return 'loading'
            if (error) return 'error'
            data.merchants.sort(compare)
            const reduced = data.merchants.slice(0, 20)
            return (reduced.map(merchant => {
              return <Merchant merchant={merchant} update={this.update} amount={this.state.amount} cart={this.state.cart} />
            }))
          }}
        </Query>
        <Button onClick={this.handleComplete}>Complete</Button>
      </div>
    )
  }
}

export default withRouter(Food)
