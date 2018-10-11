import {NotificationManager} from 'react-notifications';
import {cloneDeep} from 'lodash';

import { fetchPost } from '../../shared/fetchApi';

export const ADD_NEW_RESERVATION = "ADD_NEW_RESERVATION";
export const SET_RESERVATION_STATE = "SET_RESERVATION_STATE";
export const SET_STATE_FIELD = "SET_STATE_FIELD";

export const initialState = {
  name: '',
  hotelName: '',
  arrivalDate: null,
  departureDate: null
};


const resetReservationState = (newState) => {
  return (dispatch, getState) => {
      return dispatch({type: SET_RESERVATION_STATE, state: newState});
  }
}

const setStateField = (key, value) => {
  return (dispatch, getState) => {
      let newState = cloneDeep(getState().reservations);
      newState[key] = value;
      dispatch(resetReservationState(newState));
  }
}


const bookNewReservation = (data) => {
    return (dispatch, getState) => {
      fetchPost('reservation', data).then((res)=> {
        NotificationManager.success(`Reservation done with id:${res._id}`, 'Reservation Succesfull');
        dispatch(resetReservationState(cloneDeep(initialState)));
      });
    }
}

export {
  resetReservationState,
  setStateField,
  bookNewReservation
}
