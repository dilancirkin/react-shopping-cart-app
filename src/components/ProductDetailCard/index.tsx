import React from "react";
import { Button, Grid, Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductCardProps } from "../../models/types";
import {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/cartSlice";
import { useDispatch ,useSelector} from "react-redux";
import { RootState } from "../../redux/store";
import { Product } from "../../models/types";


const ProductDetailCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.cart.favorites); 
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    console.log("sepete eklendi");
  };

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
  return (
    <Box sx={{ padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <IconButton color={isFavorite(product) ? "secondary" : "default"}  onClick={() => handleToggleFavorite(product)} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: { xs: "300px", md: "400px" },
              objectFit: "contain",
              borderRadius: "8px",
            }}
            alt="The house from the offer."
            src={product.image}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              color={"orangered"}
              sx={{ fontSize: "1.8rem", marginBottom: "1rem" }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={{ fontSize: "1.4rem", marginBottom: "1rem" }}
            >
              CATEGORY:{product.category}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color="textSecondary"
              sx={{ fontSize: "1.2rem" }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              color={"orangered"}
              sx={{ fontSize: "1.2rem" }}
            >
              Price: ${product.price}
            </Typography>

            <Grid
              justifyContent="center"
              alignItems={"center"}
              mt={5}
              mb={2}
              item
              sx={{ textAlign: "center" }}
            >
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
                 

              ADD TO BASKET
            </Button>)}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailCard;
