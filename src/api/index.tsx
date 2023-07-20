import { useState, useEffect } from "react";
import axios from "axios";

import { PaymentData } from "../models/types";

const URL = "https://64b46d2b0efb99d86269062d.mockapi.io/Payment";

const useMock = (): PaymentData[] | undefined => {
  const [paymentData, setPaymentData] = useState<PaymentData[]>();

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<PaymentData[]>(`${URL}`);
      setPaymentData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return paymentData;
};

export default useMock;
