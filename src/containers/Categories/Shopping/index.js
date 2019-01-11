import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_SHOPPING } from './graphql'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import theme from '../../../theme'
import store from 'store'
import Merchant from '../../../components/Merchant'
import { Wrapper } from './styles'

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
    store.set('amount', { amount: currentAmt - this.state.amount })
    store.set('merchants', { merchants: updatedMerchants })
    this.props.history.push('/categories')
  }

  update = input => {
    this.setState(input)
  }

  render() {
    const compare = (a, b) => {
      if (a.numTransactions > b.numTransactions) return -1
      if (a.numTransactions < b.numTransactions) return 1
      return 0
    }
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar
            position="fixed"
            color="primary"
            style={{
              height: '10vh',
              textAlign: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" color="inherit">
              Your Remaining Budget: ${store.get('amount').amount}
            </Typography>
            <Typography variant="h6" color="secondary">
              Current options: ${this.state.amount.toFixed(2)}
            </Typography>
          </AppBar>
          <Wrapper>
            <Query
              query={GET_SHOPPING}
              variables={{
                category: 's',
                lon: store.get('geo').longitude.toString(),
                lat: store.get('geo').latitude.toString(),
                walking: store.get('walking').walking
              }}
            >
              {({ loading, error, data }) => {
                if (loading) return 'loading'
                if (error) return 'error'
                data.merchants.sort(compare)
                const reduced = data.merchants.slice(0, 20)
                return reduced.map(merchant => {
                  return (
                    <Merchant
                      merchant={merchant}
                      update={this.update}
                      amount={this.state.amount}
                      cart={this.state.cart}
                    />
                  )
                })
              }}
            </Query>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginBottom: '10%', marginTop: '5%' }}
              onClick={this.handleComplete}
            >
              Complete
            </Button>
          </Wrapper>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(Food)
