import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { Wrapper } from './styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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
        <div>Your Remaining Budget: ${remain}</div>
        <Wrapper>
          <Card onClick={() => this.props.history.push('/categories/food')}>
            <CardActionArea>
              <CardMedia title="Food" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Food
                </Typography>
                <Typography component="p">Food</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card onClick={() => this.props.history.push('/categories/shopping')}>
            <CardActionArea>
              <CardMedia title="Shopping" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Shopping
                </Typography>
                <Typography component="p">Shopping</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            onClick={() => this.props.history.push('/categories/attraction')}
          >
            <CardActionArea>
              <CardMedia title="Attraction" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Attraction
                </Typography>
                <Typography component="p">Attraction</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card onClick={() => this.props.history.push('/categories/misc')}>
            <CardActionArea>
              <CardMedia title="Food" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Misc.
                </Typography>
                <Typography component="p">Misc.</Typography>
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
                <Button onClick={createItinerary}>Finish!</Button>
                <div>{loading && 'Loading...'}</div>
              </Wrapper>
            )}
          </Mutation>
        </Wrapper>
      </div>
    )
  }
}

export default withRouter(Categories)
