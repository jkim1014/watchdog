import React, { Component } from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import theme from '../../theme'
import { Wrapper, Wrapper2 } from './styles.js'
import store from 'store'

class BudgetActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      walking: false,
      weight: ''
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
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary" style={{ height: '10vh', textAlign: 'center', justifyContent: 'center'}}>
            <Typography variant="h6" color="inherit">
              Personalization
            </Typography>
          </AppBar>
            <TextField
              variant="outlined"
              label="Budget"
              value={this.state.amount}
              onChange={this.handleChange('amount')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              style={{ width: '60%', marginTop: '20%'}}
            />
          <TextField
            variant="outlined"
            label="Itinerary Name"
            value={this.state.weight}
            onChange={this.handleChange('weight')}
            style={{ width: '60%', marginTop: '10%'}}
          />
          <Button
            onClick={() => this.setState({ walking: true })}
            variant="contained"
            color="primary"
            style={{ width: '30%', margin: '1%', marginTop: '9%' }}
          >
            Walking
          </Button>
          <Button
            onClick={() => this.setState({ walking: false })}
            variant="contained"
            color="secondary"
            style={{ width: '30%', margin: '1%' }}
          >
            Driving
          </Button>
          <Button
            onClick={() => {
              store.set('amount', { amount: this.state.amount })
              store.set('title', { title: this.state.weight })
              store.set('walking', { walking: this.state.walking })
              store.set('merchants', { merchants: [] })
              this.props.history.push('/categories')
            }}
          >
            Pick Places!
          </Button>
        </MuiThemeProvider>
      </Wrapper>
    )
  }
}

export default BudgetActivities
