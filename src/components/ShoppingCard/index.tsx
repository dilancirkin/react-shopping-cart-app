import React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Container,
  IconButton,
  Typography,
  ButtonBase,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store"; // RootState tipini burada alın

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ShoppingCard = ({ showRemoveButton }: { showRemoveButton?: boolean }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  //sepette ürünün sayısıbı arttırır
  const handleIncreaseQuantity = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };

  //ürünün sayısını eksiltir
  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <Container>
      {cartItems.map((item) => (
        <Paper
          sx={{
            width: 600,
            p: 2,
            borderRadius: 16, // Increase the border radius to 16px
            marginBottom: 4,
          }}
        >
          <Grid container alignItems="center">
            <Grid item>
              <ButtonBase sx={{ width: 96, height: 96, marginRight: 3 }}>
                <Img alt="complex" src={item.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                color={"orangered"}
                component="div"
              >
                {item.title}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Category:{item.category}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                color="text.secondary"
              >
                Price: ${item.price}
              </Typography>

              {showRemoveButton && (
                <IconButton
                  onClick={() => handleRemoveFromCart(item.id)}
                  aria-label="delete"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>

            <Grid item>
              {showRemoveButton && (
                <IconButton
                  component="div"
                  color="secondary"
                  aria-label="add to cart"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </IconButton>
              )}
              <Typography variant="overline" display="block" gutterBottom>
                Quantitiy:{item.quantity}
              </Typography>
              {showRemoveButton && (
                <IconButton
                  color="secondary"
                  aria-label="remove from cart"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default ShoppingCard;
