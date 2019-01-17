import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import RentalDetailInfo from "./RentalDetailInfo";
import RentalMap from "./RentalMap";

class RentalDetail extends Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    console.log("Rental Details ID::", this.props.match.params.id);
    const rental = this.props.rental;
    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city}, ${rental.street}`} />
              </div>
            </div>
          </div>
          <RentalDetailInfo rental={rental} />
        </section>
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
