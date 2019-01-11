import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import store from 'store'

class Categories extends Component {
  update = input => this.setState(input)
  render() {
    const store1 = store.get('geo')
    const store2 = store.get('amount')
    return (
      <div>
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
        <Card onClick={() => this.props.history.push('/categories/attraction')}>
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
        <Button onClick={() => console.log(store1, store2)}>Finish!</Button>
      </div>
    )
  }
}

export default withRouter(Categories)
