import { useState, useEffect } from "react";
import axios from "axios";
const URL = "https://fakestoreapi.com/products/";

export type ProductDetailType = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

const useFetch = () => {
  const [data, setData] = useState<ProductDetailType[] | null>();

  const fetchData = async () => {
      const response = await axios.get(`${URL}`);
      setData(response.data);
    
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {data };
};

export default useFetch;
