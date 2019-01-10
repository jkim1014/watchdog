import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import Food from './Food'
import Shopping from './Shopping'
import Attractions from './Attractions'
import Misc from './Misc'

class Categories extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/categories/food" render={() => <Food />} />
          <Route path="/categories/shopping" render={() => <Shopping />} />
          <Route
            path="/categories/attractions"
            render={() => <Attractions />}
          />
          <Route path="/categories/misc" render={() => <Misc />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(withApollo(Categories))
