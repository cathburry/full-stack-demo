import {
  NEW_CATEGORY_ENTRY,
  CATEGORY_LIST_PENDING,
  CATEGORY_LIST_FULFILLED,
  CATEGORY_LIST_REJECTED,
  UPDATE_CATEGORY_ENTRY,
  DELETE_CATEGORY_ENTRY,
  CATEGORY_LIST_BY_ID
} from '../constants/actions';

/* 
  This reducer is a pure function that takes the previous state and an action, 
  and returns the next state. 
*/

const INITIAL_STATE = {
  categories: [],
  loading: false,
  error: false,
};

const categories = ( state = INITIAL_STATE, action ) => {
  switch(action.type){
    case CATEGORY_LIST_PENDING:
      return { ...state, loading: true, error: false };
    case CATEGORY_LIST_FULFILLED:
      return { ...state, loading: false, error: false, categories: action.payload.data };
    case CATEGORY_LIST_REJECTED:
      return { ...state, loading: false, error: true };
    case CATEGORY_LIST_BY_ID:
      return { ...state, categories: action.payload };
    case UPDATE_CATEGORY_ENTRY:
      return { ...state, categories: action.payload };
    case DELETE_CATEGORY_ENTRY:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

export default categories;