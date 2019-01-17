import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT
} from "./types";
import axios from "axios";

const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};
const fetchRentalByIdInit = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT,
    rental
  };
};

const fetchRentalSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  };
};

export const fetchRentals = () => {
  return dispatch => {
    axios
      .get("/api/v1/rentals")
      .then(res => {
        return res.data;
      })
      .then(rentals => {
        dispatch(fetchRentalSuccess(rentals));
      });
  };
};

export const fetchRentalById = rentalId => {
  console.log("rentalId", rentalId);
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());
    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => {
        return res.data;
      })
      .then(rental => {
        dispatch(fetchRentalByIdSuccess(rental));
      });
  };
};
