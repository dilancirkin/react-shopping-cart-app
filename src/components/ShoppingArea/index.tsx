import { Box, Rectangle } from "./style";
import ShoppingCard from "../ShoppingCard";

const ShoppingArea = () => {
  return (
    <Box>
      <Rectangle>
        <ShoppingCard showRemoveButton={false} />
      </Rectangle>
    </Box>
  );
};

export default ShoppingArea;
