import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import config from './config'
import Home from './containers/Home'
import Final from './containers/Final'
import BA from './containers/BudgetActivities'
import Categories from './containers/Categories'
import Food from './containers/Categories/Food'
import Shopping from './containers/Categories/Shopping'
import Misc from './containers/Categories/Misc'
import Attraction from './containers/Categories/Attractions'

// creates new client
const client = new ApolloClient({
  uri: config.graphqlUrl
})

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className="App">
            <Switch>
              <Route path="/budget" component={BA} />
              <Route path="/categories/food" component={Food} />
              <Route path="/categories/shopping" component={Shopping} />
              <Route path="/categories/misc" component={Misc} />
              <Route path="/categories/attraction" component={Attraction} />
              <Route path="/categories" component={Categories} />
              <Route path="/result" component={Final} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App
