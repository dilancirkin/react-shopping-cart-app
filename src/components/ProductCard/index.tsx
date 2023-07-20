import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // RootState tipini burada alın
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../../models/types";

import {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/cartSlice";

import { ProductCardProps } from "../../models/types";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.cart.favorites);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const notify = () => toast(" ADD TO BASKET!");

  //sepete ekle
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    notify();
  };

  //sepetten çıkar
  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product.id));
  };

  const isProductInCart = () => {
    return cartItems.some((item) => item.id === product.id);
  };

  const isFavorite = (product: Product) => {
    return favoriteItems.some((item) => item.id === product.id);
  };

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleClick = () => {
    navigate(`/${product.id}`); // Product detail page'e yönlendirme
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: 345,
        border: "2px solid orange",
      }}
    >
      <CardHeader
        action={
          <IconButton
            color={isFavorite(product) ? "secondary" : "default"}
            aria-label="add to favorites"
            onClick={() => handleToggleFavorite(product)}
          >
            <FavoriteIcon />
          </IconButton>
        }
      />
      <CardMedia
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          backgroundColor: "white",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          onClick={handleClick}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          color="orangered"
        >
          {product.title}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="textSecondary"
          sx={{ mb: 1 }}
        >
          {truncateDescription(product.description, 90)}
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          {product.category}
        </Typography>
      </CardContent>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="overline" display="block" gutterBottom>
            Price: ${product.price}
          </Typography>
        </Grid>
        <Grid mb={2} item>
          {isProductInCart() ? (
            <Button
              onClick={() => handleRemoveFromCart(product)}
              variant="outlined"
              color="secondary"
            >
              REMOVE BASKET
            </Button>
          ) : (
            <Button
              onClick={() => handleAddToCart(product)}
              variant="outlined"
              color="secondary"
            >
              <ToastContainer position="top-right" autoClose={1000} />
              ADD TO BASKET
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductCard;
