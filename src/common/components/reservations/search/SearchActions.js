import { fetchGet } from '../../../shared/fetchApi';
import {getDispDateByString} from '../../../shared/utility';
import { PAGINATION_PAGE_PER_PAGE } from '../../../shared/ApplicationConstants';

export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';

export const initialState = {
  data: [],
  total: 0,
  currUrl: 'reservations',
  currPage: 0
};


const setSearchState = (newState) => {
  return (dispatch, getState) => {
      return dispatch({ type: SET_SEARCH_RESULT, state: newState});
  }
}

const searchReservations = (url, pageNumber) => {
  return (dispatch, getState) => {
      let newUrl = getUrlByPage(url, pageNumber);
      fetchGet(newUrl).then((res) => {
        let formattedData = formatData(res);
        dispatch(setSearchState({
          data : formattedData.data,
          total: formattedData.count,
          currUrl: url,
          currPage: (pageNumber -1)
        }));
      });
  }
}

const getUrlByPage = (url, pageNumber) => {
  if(url.indexOf('?') == -1){
      url+='?';
  } else {
    url+='&';
  }
  url+= `page=${pageNumber}&size=${PAGINATION_PAGE_PER_PAGE}`;
  return url;
}

const formatData = (resp) => {
  let data = [];
  let count = 0;
  if(resp && resp.data){
      let serverData = Array.isArray(resp.data) ? resp.data : [resp.data];
      count = resp.count;
      serverData.forEach(resv => {
          data.push({
            id: resv._id,
            name: resv.name,
            hotelName: resv.hotelName,
            startDate: getDispDateByString(resv.arrivalDate),
            endDate: getDispDateByString(resv.departureDate)
          });
      });
  }
  return {'data': data, 'count': count};
}

export {
  setSearchState,
  searchReservations
}
