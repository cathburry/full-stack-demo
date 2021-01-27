import axios from 'axios';
import {
   NEW_CATEGORY_ENTRY,
   CATEGORY_LIST,
   UPDATE_CATEGORY_ENTRY,
   DELETE_CATEGORY_ENTRY,
   CATEGORY_LIST_BY_ID,
} from '../constants/actions';

/* Create a business entry */
export function newCategoryEntry(fields){
   const request = axios.post('/category/create', fields );
   return {
      type: NEW_CATEGORY_ENTRY,
      payload: request
   }
}

/* Retrieve all businesses */
export function categoryList(){
   const request = axios.get('/category/read');
   return {
      type: CATEGORY_LIST,
      payload: request
   }
}

/* Retrieve a single record by  id */
export function categoryListById( id ){
   const request = axios.get('/category/readbyid/', { params: { id: id } });
   return {
      type: CATEGORY_LIST_BY_ID,
      payload: request
   }
}

/* Update business information */
export function updateCategoryEntry( fields ){
   const request = axios.put('/category/update', fields );
   return {
      type: UPDATE_CATEGORY_ENTRY,
      payload: request
   }
}

/* Delete an entry by id */
export function deleteCategoryEntry( entryid ){
   const request = axios.delete('/category/delete', { params : { entryid: entryid } } );
   return {
      type: DELETE_CATEGORY_ENTRY,
      payload: request
   }
}