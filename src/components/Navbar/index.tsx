import { Link } from "react-router-dom";
import { NavbarComp, Left, Right } from "../Navbar/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon  from "@mui/icons-material/FavoriteBorder";

import { Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; 

function Navbar() {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <NavbarComp>
      <Left>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", marginRight: "8px" }}>
            <img src={logo} alt="Logo" style={{ width: "40px" }} />
          </Link>
          <Link to="/" style={{ textDecoration: "none", marginRight: "8px" }}>
            <Typography>PRODUCTS</Typography>
          </Link>
        </div>
      </Left>
      <Right>
        <div style={{ display: "flex", alignItems: "center" }}>
        <Link
            to="/favorites"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Remove the underline */}
            <FavoriteBorderIcon 
              style={{ marginRight: "4px" }}
              color="secondary"
            />
         
          </Link>
          <Link
            to="/cartcontent"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Remove the underline */}
            <AddShoppingCartIcon
              style={{ marginRight: "4px" }}
              color="secondary"
            />
            <Typography>{items.length}</Typography>
          </Link>
        </div>
      </Right>
    </NavbarComp>
  );
}

export default Navbar;
