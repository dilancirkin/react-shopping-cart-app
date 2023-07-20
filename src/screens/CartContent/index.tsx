import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store"; // RootState tipini burada alın
import { calculateTotal } from "../../redux/cartSlice";

import ShoppingCard from "../../components/ShoppingCard";

const CartContent = (): JSX.Element => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.total);

  useEffect(() => {
    // Sayfa yüklendiğinde veya cartItems değiştiğinde toplam tutarı güncelle
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  return (
    <Container>
      {cartItems.length > 0 ? (
        <Container style={{ display: "flex", overflow: "auto" }}>
          <div style={{ flex: 1, marginTop: 30 }}>
            <ShoppingCard showRemoveButton={true} />
          </div>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <Card style={{ flex: 1, marginLeft: "20px" }}>
              <CardContent>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  color={"orangered"}
                  sx={{ fontSize: "1.4rem" }}
                >
                  CART TOTAL: ${cartTotal}
                </Typography>
                <Button
                  component={Link}
                  to="/payment"
                  variant="outlined"
                  color="secondary"
                >
                  GO TO THE PAYMENT SCREEN
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      ) : (
        <Typography
          variant="h6"
          align="center"
          color="orangered"
          sx={{ fontWeight: "bold", marginTop: 30 }}
        >
          THE BASKET IS YET EMPTY!{" "}
        </Typography>
      )}
    </Container>
  );
};

export default CartContent;
