import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { Wrapper, Text } from './styles.js'
import store from 'store'

class BudgetActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      walking: false
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const styles = {
      card: {
        maxWidth: 345
      },
      media: {
        height: 140
      }
    }
    return (
      <Wrapper>
        <Text>Set a Budget Yourself!</Text>
        <TextField
          variant="outlined"
          label="Amount"
          value={this.state.amount}
          onChange={this.handleChange('amount')}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
        <div>Will you walk through the entire day?</div>
        <Button onClick={() => this.setState({ walking: true})}>Walking</Button>
        <Button onClick={() => this.setState({ walking: false })}>Driving</Button>
        <Button
          onClick={() => {
            store.set('amount', { amount: this.state.amount })
            store.set('walking', { walking: this.state.walking })
            this.props.history.push('/categories')
          }}
        >
          Pick Places!
        </Button>
      </Wrapper>
    )
  }
}

export default BudgetActivities
