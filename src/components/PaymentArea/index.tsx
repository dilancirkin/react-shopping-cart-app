import React, { useState, useEffect } from "react";
import { Box, Rectangle } from "./style";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { calculateTotal } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartSlice";
import useMock from "../../api/index";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const PaymentArea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.total);
  const mockPaymentData = useMock();
  const [paymentStatus, setPaymentStatus] = useState<
    "initial" | "success" | "error"
  >("initial");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  const handlePayment = () => {
    const cardNumberInput = (
      document.getElementById("cardNumberInput") as HTMLInputElement
    )?.value;
    const cardHolderNameInput = (
      document.getElementById("cardHolderNameInput") as HTMLInputElement
    )?.value;
    const cvcInput = (document.getElementById("cvcInput") as HTMLInputElement)
      ?.value;
    const expirationDateInput = (
      document.getElementById("expirationDateInput") as HTMLInputElement
    )?.value;

    //girdiler ile apiden gelenler eşleşiyor mu diye bakılıyor,tarihler aynı formatta sağlandı
    const matchingCard = mockPaymentData?.find((card) => {
      const formattedExpirationDate = new Date(
        card.expirationDate
      ).toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" });
      return (
        card.cardNumber.toString() === cardNumberInput &&
        card.fullName === cardHolderNameInput &&
        card.cvv === cvcInput &&
        formattedExpirationDate === expirationDateInput
      );
    });

    // Eğer eşleşen kart varsa, ödeme başarılıdır
    if (matchingCard) {
      setPaymentStatus("success");
      handleClickOpen();
      setTimeout(() => {
        dispatch(clearCart());
        navigate("/");
      }, 2000);
    } else {
      setPaymentStatus("error");
    }
  };

  return (
    <Box>
      <Rectangle>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          color={"#9575cd"}
          sx={{ marginBottom: 4, fontSize: "1.2rem" }}
        >
          CARD INFORMATION
        </Typography>
        <FormControl color="warning">
          <InputLabel htmlFor="component-outlined">NameSurname</InputLabel>
          <OutlinedInput
            style={{ marginBottom: 10 }}
            id="cardHolderNameInput"
            name="cardHolderName"
            label="Name Surname"
          />
        </FormControl>
        <FormControl color="warning">
          <InputLabel htmlFor="component-outlined">CardNumber</InputLabel>
          <OutlinedInput
            style={{ marginBottom: 10 }}
            id="cardNumberInput"
            name="cardNumber"
            label="CardNumber"
          />
        </FormControl>
        <FormControl color="warning">
          <InputLabel htmlFor="component-outlined">CVC</InputLabel>
          <OutlinedInput
            style={{ marginBottom: 10 }}
            id="cvcInput"
            name="cvc"
            label="CVC"
          />
        </FormControl>

        <TextField
          fullWidth
          type="tel"
          label="Expiry date (MM/YY)"
          name="expiry"
          id="expirationDateInput"
          variant="filled"
          color="warning"
        />

        <Typography
          variant="overline"
          display="block"
          gutterBottom
          color={"#9575cd"}
        >
          CART TOTAL: ${cartTotal}
        </Typography>

        <Button variant="outlined" color="warning" onClick={handlePayment}>
          PAY
        </Button>
        {paymentStatus === "success" && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"PAYMENT INFO"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Payment is successful, you are redirected to the homepage...{" "}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
        {paymentStatus === "error" && (
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            color={"orangered"}
          >
            Payment failed! Please check card information.{" "}
          </Typography>
        )}
      </Rectangle>
    </Box>
  );
};

export default PaymentArea;
