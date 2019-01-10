import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalDetail extends Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    console.log("Rental Details ID::", this.props.match.params.id);
    const rental = this.props.rental;
    if (rental.id) {
      return (
        <div>
          <h1>{rental.title}</h1>
          <h1>{rental.city}</h1>
          <h1>{rental.description}</h1>
          <h1>{rental.dailyRate}$</h1>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

const mapStateToProps = state => {
  //debugger;
  return {
    rental: state.rental.data
  };
};

export default connect(
  mapStateToProps,
  null
)(RentalDetail);
