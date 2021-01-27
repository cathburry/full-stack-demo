import {
  NEW_EXPENSE_ENTRY,
  EXPENSE_LIST_PENDING,
  EXPENSE_LIST_FULFILLED,
  EXPENSE_LIST_REJECTED,
  UPDATE_EXPENSE_ENTRY,
  DELETE_EXPENSE_ENTRY,
  EXPENSE_LIST_BY_ID
} from '../constants/actions';

  /* 
    This reducer is a pure function that takes the previous state and an action, 
    and returns the next state. 
  */
  
const INITIAL_STATE = {
  expense: [],
  loading: false,
  error: false,
};

const expense = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
      case EXPENSE_LIST_PENDING:
        return { ...state, loading: true, error: false };
      case EXPENSE_LIST_FULFILLED:
        return { ...state, loading: false, error: false, expense: action.payload.data };
      case EXPENSE_LIST_REJECTED:
        return { ...state, loading: false, error: true };
      case EXPENSE_LIST_BY_ID:
        return { ...state, expense: action.payload };
      case UPDATE_EXPENSE_ENTRY:
        return { ...state, expense: action.payload };
      case DELETE_EXPENSE_ENTRY:
        return { ...state, expense: action.payload };
      default:
        return state;
    }
}

export default expense;