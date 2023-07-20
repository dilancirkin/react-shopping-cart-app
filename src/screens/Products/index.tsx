import { Grid } from "@mui/material";

import ProductCard from "../../components/ProductCard";
import useFetch from "../../hooks";

const Products = () => {
  const products = useFetch();

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 100 }}>
      <Grid container spacing={10} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
