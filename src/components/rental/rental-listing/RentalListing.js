import React, { Component } from "react";
import RentalList from "./RentalList";
import { connect } from "react-redux";
import * as actions from "actions";

//HOC- Higher-Order Components
// const withAlert = WrappedComponent => {
//   return class extends Component {
//     alertUser() {
//       alert("Wake up !!!!!");
//     }
//     render() {
//       debugger;
//       const p = this.props;
//       return <WrappedComponent {...this.props} alertUser={this.alertUser} />;
//     }
//   };
// };

// const withDanger = WrappedComponent => {
//   return class extends Component {
//     dangerUser() {
//       alert("Wake up danger!!!!!");
//     }
//     render() {
//       debugger;
//       return <WrappedComponent {...this.props} dangerUser={this.dangerUser} />;
//     }
//   };
// };

//Comnposite Pattern
// class AlertRentalListing extends Component {
//   alertRentalListingsUser() {
//     alert("RentalListings!!!!");
//   }
//   render() {
//     return (
//       <RentalListing
//         {...this.props}
//         alertRentalListingsUser={this.alertRentalListingsUser}
//       />
//     );
//   }
// }

class RentalListing extends Component {
  componentWillMount() {
    // debugger;
    // this.props.dangerUser();
    // this.props.alertUser();
    this.props.dispatch(actions.fetchRentals());
  }
  render() {
    // debugger;
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  // debugger;
  return {
    rentals: state.rentals.data
  };
};

// export default withDanger(
//   connect(
//     mapStateToProps,
//     null
//   )(withAlert(AlertRentalListing))
// );

// export default withAlert(
//   withDanger(
//     connect(
//       mapStateToProps,
//       null
//     )(AlertRentalListing)
//   )
// );

// export default connect(
//   mapStateToProps,
//   null
// )(AlertRentalListing);

export default connect(
  mapStateToProps,
  null
)(RentalListing);
