import React from "react";
import {
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Grid,
  Card,
  CardMedia,
  Container,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // RootState tipini burada alın
import { Product } from "../../models/types";

import { addToFavorites, removeFromFavorites } from "../../redux/cartSlice";

const FavoriteCard = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.cart.favorites);

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

  //descriptionun bir bölümünü sayfada gösteren fonksiyon
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <Container sx={{ mt: 10 }}>
      {favoriteItems.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="orangered"
          sx={{ fontWeight: "bold", marginTop: 30 }}
        >
          YOU HAVE NOT ADDED A FAVORITE YET!{" "}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {favoriteItems.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
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
                      color={isFavorite(item) ? "secondary" : "default"}
                      aria-label="add to favorites"
                      onClick={() => handleToggleFavorite(item)}
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
                    src={item.image}
                    alt={item.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    color="orangered"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {truncateDescription(item.description, 90)}
                  </Typography>
                  <Typography variant="overline" display="block" gutterBottom>
                    {item.category}
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
                      Price: ${item.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoriteCard;
