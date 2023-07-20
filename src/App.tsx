import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./screens/Products";
import CartContent from "./screens/CartContent";
import ProductDetail from "./screens/ProductDetail";
import Payment from "./screens/Payment";
import Favorites from "./screens/Favorites";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" Component={Products} />
            <Route path="/:id" Component={ProductDetail} />
            <Route path="/cartcontent" Component={CartContent} />
            <Route path="/payment" Component={Payment} />
            <Route path="/favorites" Component={Favorites} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
