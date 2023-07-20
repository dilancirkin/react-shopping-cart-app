import { Grid, Container } from "@mui/material";

import ShoppingArea from "../../components/ShoppingArea";
import PaymentArea from "../../components/PaymentArea";

const Payment = (): JSX.Element => {
  return (
    <Container style={{display:'flex'}}>
      <Grid>
        <ShoppingArea />
      </Grid>
      <Grid>
        <PaymentArea />
      </Grid>
    </Container>
  );
};

export default Payment;
