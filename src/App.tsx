import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar'
import Products from './screens/Products';
import CartContent from './screens/CartContent';
import ProductDetail from './screens/ProductDetail';


function App() {
  return (
    <Router>
    <div>
    <Navbar/>
      <Routes>
      <Route path="/" Component={Products}/>
      <Route path="/product/id" Component={ProductDetail}/>
      <Route path="/cartcontent" Component={CartContent}/>
      <Route path="/payment" Component={CartContent}/>
      </Routes>
    </div>
  </Router>
  );
}




export default App;
