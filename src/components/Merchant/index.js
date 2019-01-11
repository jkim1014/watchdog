import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class BudgetActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }
  render() {
    let text = 'add'
    if (this.state.selected) {
      text = 'Remove'
    } else {
      text = 'Add'
    }
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.merchant.name}
          </Typography>
          <Typography color="textSecondary">
            {this.props.merchant.address}
          </Typography>
          <Typography color="textSecondary">
            {this.props.merchant.distance.toFixed(1)} mi
          </Typography>
          <Typography component="p">
            Average amount spent:
            <br />${this.props.merchant.avgAmount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
                let correctedAmount
                let correctedCart
                if (this.state.selected) {
                  correctedAmount = this.props.amount - this.props.merchant.avgAmount
                  correctedCart = this.props.cart
                  const index = correctedCart.indexOf(this.props.merchant.id);
                  console.log(index)
                  if (index > -1) {
                      correctedCart.splice(index, 1);
                  }
                } else {
                  correctedAmount = this.props.amount + this.props.merchant.avgAmount
                  correctedCart = this.props.cart.concat([this.props.merchant.id])
                }
                this.setState({ selected: !this.state.selected })
                this.props.update({ amount: correctedAmount })
                this.props.update({ cart: correctedCart })
            }}
          >
            {text}
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default BudgetActivities
