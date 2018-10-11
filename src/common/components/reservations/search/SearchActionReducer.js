import { cloneDeep } from 'lodash';
import {
  initialState,
  SET_SEARCH_RESULT
} from "./SearchActions";

export const searchActionReducer = (state = cloneDeep(initialState), action: any) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return action.state;
    default:
        return state;
  }
}
