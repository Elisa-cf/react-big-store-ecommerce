import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_one as url_one } from '../utils/constants'
import { single_product_url  as single_url} from '../utils/constants'
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
  products_loading: false,
  products_error: false,
  products: [],
  featured_products:[],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState) 

 //DISPATCH ACTIONS

 const openSidebar = () => {
   dispatch({ type: SIDEBAR_OPEN})
 }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }



  //FETCHING ALL DATA FROM FAKEAPI:
  //function that handles the loading, the succes and the error:

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN }) 
    try {
      const response_one = await url_one.get()
      const products = response_one.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }

  }


  //FETCHING SINGLE PRODUCT FROM FAKE API:


 const fetchSingleProduct = async (id) => {
   dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    try {
      const response = await url_one.get(`/${id}`)
      console.log(response);
      const singleProduct = await response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])



  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct}}>  
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
