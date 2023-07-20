import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../models/types";

const URL = "https://fakestoreapi.com/products/";

const useFetch = (): Product[] | undefined => {
  const [products, setProducts] = useState<Product[]>();

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(`${URL}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return products;
};

export default useFetch;
