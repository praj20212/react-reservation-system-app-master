import { cloneDeep } from 'lodash';
import {
  initialState,
  SET_RESERVATION_STATE
} from "./ReservationActions";

export const reservationActionReducer = (state = cloneDeep(initialState), action: any) => {
  switch (action.type) {
    case SET_RESERVATION_STATE:
      return action.state;
    default:
        return state;
  }
}
