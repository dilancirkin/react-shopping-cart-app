import React from "react";
import { CardContent, Typography, Button,Card, CardMedia } from "@mui/material";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const handleClick = () => {
  };

  return (
    <Card onClick={handleClick}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="h5" component="h2">
          {product.category}
        </Typography>
        <Typography variant="h6" component="h6">
          {product.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: ${product.price}
        </Typography>
        <Button variant="outlined">sepete ekle</Button>
   
      </CardContent>
    </Card>

            
  );
};

export default ProductCard;
