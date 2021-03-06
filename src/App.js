import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'  
import { Home, Products, SingleProduct, About, Error, Cart, Checkout, PrivateRoute } from './pages'


//app should be only responsible to render the pages
function App() {
  return (
  <Router> 
    <Navbar/>
    <Sidebar/>
  <Switch>
   <Route exact path="/">
     <Home/>
   </Route>
   <Route exact path="/about">
    <About />
    </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products/>
        </Route>
         <Route exact path="/products/:id" children={<SingleProduct/>}/> {/*will redirect to the id of SingleProduct */}
        <Route exact path="/checkout">
          <Checkout />
        </Route>
         <Route exact path="/*">  {/** is gonna match any path */}
          <Error />
        </Route>
  </Switch>
  <Footer/>
  </Router>
  )
}

export default App
