import React from "react";
import { Grid } from "@mui/material";

import ProductCard from "../../components/ProductCard";
import useFetch from "../../hooks";

const Products = () => {
  const products = useFetch();

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} alignItems="stretch">
        {products.map((product) => (
        <Grid item xs={12} sm={4} key={product.id}>
        <ProductCard product={product} />
      </Grid>
      ))}
  </Grid>
   
  );
};

export default Products;
