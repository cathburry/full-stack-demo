import axios from 'axios';
import {
   NEW_EXPENSE_ENTRY,
   EXPENSE_LIST,
   UPDATE_EXPENSE_ENTRY,
   DELETE_EXPENSE_ENTRY,
   EXPENSE_LIST_BY_ID,
} from '../constants/actions';

/* Create a business entry */
export function newExpenseEntry( fields ){
   const request = axios.post('/create', fields );
   return {
      type: NEW_EXPENSE_ENTRY,
      payload: request
   }
}

/* Retrieve all businesses */
export function expenseList(){
   const request = axios.get('/read');
   return {
      type: EXPENSE_LIST,
      payload: request
   }
}

/* Retrieve a single record by  id */
export function expenseListById( id ){
   const request = axios.get('/readbyid/', { params: { id: id } });
   return {
      type: EXPENSE_LIST_BY_ID,
      payload: request
   }
}

/* Update business information */
export function updateExpenseEntry( fields ){
   const request = axios.put('/update', fields );
   return {
      type: UPDATE_EXPENSE_ENTRY,
      payload: request
   }
}

/* Delete an entry by id */
export function deleteExpenseEntry( entryid ){
   const request = axios.delete('/delete', { params : { entryid: entryid } } );
   return {
      type: DELETE_EXPENSE_ENTRY,
      payload: request
   }
}