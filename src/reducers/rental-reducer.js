import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT
} from "../actions/types";
const INITIAL_STATE = {
  rentals: {
    data: []
  },
  rental: {
    data: {}
  }
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  //   debugger;
  switch (action.type) {
    case FETCH_RENTALS:
      return { ...state, data: action.rentals };

    default:
      //   debugger;
      return state;
  }
};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID_SUCCESS:
      // return Object.assign({}, state, { data: action.rental });
      return { ...state, data: action.rental };

    case FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };

    default:
      //   debugger;
      return state;
  }
};
