import React, { Component } from "react";
import RentalCard from "./RentalCard";

class RentalList extends Component {
  renderRentals = () => {
    console.log("RentalList class this.props::", this.props);
    return this.props.rentals.map((rental, index) => {
      return (
        <RentalCard colNum="col-md-3 col-xs-6" rental={rental} key={index} />
      );
    });
  };

  render() {
    return <div className="row">{this.renderRentals()}</div>;
  }
}

export default RentalList;
