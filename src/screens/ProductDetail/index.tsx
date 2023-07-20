import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import ProductDetailCard from "../../components/ProductDetailCard";
import useFetch from "../../hooks";
import { ProductParams } from "../../models/types";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<ProductParams>();
  const products = useFetch();

  if (!id) {
    return <div>Product ID not provided!</div>;
  }

  if (!products) {
    return (
      <Typography
        variant="h6"
        align="center"
        color="orangered"
        sx={{ fontWeight: "bold", marginTop: 30 }}
      >
        Loading...
      </Typography>
    );
  }

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default ProductDetailPage;
