import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {reservationActionReducer} from '../components/reservations/ReservationActionReducer';
import {searchActionReducer} from '../components/reservations/search/SearchActionReducer';

export const appReducer = combineReducers({
    reservations : reservationActionReducer,
    search : searchActionReducer
});
