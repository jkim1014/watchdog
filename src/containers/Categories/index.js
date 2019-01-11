import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { Wrapper } from './styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import theme from '../../theme'
import store from 'store'
import { CREATE_ITINERARY } from './graphql'

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchants: []
    }
  }
  update = input => this.setState(input)
  render() {
    const remain = store.get('amount').amount
    console.log(store.get('title').title)
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar
            position="static"
            color="primary"
            style={{
              height: '10vh',
              textAlign: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" color="inherit">
              Your Remaining Budget: ${remain}
            </Typography>
          </AppBar>
          <Wrapper>
            <Card
              onClick={() => this.props.history.push('/categories/food')}
              style={{ margin: '4%', borderColor: '#ff6659' }}
            >
              <CardActionArea>
                <CardMedia title="Food" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Food
                  </Typography>
                  <Typography component="p">Hungry?</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              onClick={() => this.props.history.push('/categories/shopping')}
              style={{ margin: '4%' }}
            >
              <CardActionArea>
                <CardMedia title="Shopping" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Shopping
                  </Typography>
                  <Typography component="p">Fresh Look?</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              onClick={() => this.props.history.push('/categories/attraction')}
              style={{ margin: '4%' }}
            >
              <CardActionArea>
                <CardMedia title="Attraction" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Attraction
                  </Typography>
                  <Typography component="p">Round 2?</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              onClick={() => this.props.history.push('/categories/misc')}
              style={{ margin: '4%' }}
            >
              <CardActionArea>
                <CardMedia title="Misc" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Misc.
                  </Typography>
                  <Typography component="p">Other Things?</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Mutation
              mutation={CREATE_ITINERARY}
              variables={{
                input: {
                  name: store.get('title').title,
                  merchantsId: store.get('merchants').merchants,
                  budget: store.get('amount').amount
                }
              }}
              onCompleted={data => {
                if (data.createItinerary.success) {
                  store.clearAll()
                  this.props.history.push('/')
                }
              }}
            >
              {(createItinerary, { loading }) => (
                <Wrapper>
                  <Button
                    onClick={createItinerary}
                    variant="contained"
                    color="secondary"
                    style={{ width: '80%', height: '40%', alignSelf: 'center'}}
                  >
                    Finish!
                  </Button>
                  <div>{loading && 'Loading...'}</div>
                </Wrapper>
              )}
            </Mutation>
          </Wrapper>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(Categories)
