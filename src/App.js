import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import {} from "redux-thunk";

import "App.css";
import Header from "shared/Header";
import RentalListing from "components/rental/rental-listing/RentalListing";
import RentalDetail from "components/rental/rental-detail/RentalDetail";
import { init } from "reducers/index";

const store = init();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRentalList: true
    };
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/rentals" />;
                }}
              />
              <Route exact path="/rentals" component={RentalListing} />
              <Route exact path="/rentals/:id" component={RentalDetail} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
