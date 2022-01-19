import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
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
import { FaAcquisitionsIncorporated } from 'react-icons/fa'

const initialState = {
  isSidebarOpen: false,
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState) //state=current state, dispatch: the function that we use to control our state. First we pass the type of action into the dispatch and then we go to the reducer(the function that actually controls our state) and that is how we operate on the state using usereducer. You can only manipulate the state if there is an action. UseReducer it is very handy when your app becomes bigger and more complex, you avoid bugs, errors... because you are controlling the states of your app.

  //reducer = function that will control our state, initialState = 


 //DISPATCH ACTIONS

 const openSidebar = () => {
   dispatch({ type: SIDEBAR_OPEN})
 }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  return (
    <ProductsContext.Provider value={{...state, openSidebar, closeSidebar}}>  {/* you pass the current state and the functions in orther to be able to use them in the components */}
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
