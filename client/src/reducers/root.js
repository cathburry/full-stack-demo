import { combineReducers } from 'redux';
import expense from './expense';
import categories from './categories';

const rootReducer = combineReducers({
  expense,
  categories,
});

export default rootReducer;
