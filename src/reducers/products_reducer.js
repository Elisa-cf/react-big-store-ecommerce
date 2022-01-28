import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {  //state: the old state before the updated, action: the action that we want to do

 if(action.type === 'SIDEBAR_OPEN') {
   return { ...state, isSidebarOpen: true}
 }

  if (action.type === 'SIDEBAR_CLOSE') {
    return { ...state, isSidebarOpen: false }
  }

  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return {...state, products_loading: true}
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`) //this will tell you that there is something wrong
}

export default products_reducer
