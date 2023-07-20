export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

 export interface CartItem extends Product {
    quantity: number;
  }
  
 export interface CartState {
    items: CartItem[];
    favorites: Product[];
    total: number; // Toplam tutarı tutacak alan
  }

  export interface ProductParams {
    id?: string;
    [key: string]: string | undefined;
  
  }

  export interface ProductCardProps {
    product: Product;
  }

  export interface PaymentData {
    id: number;
    cardNumber: number;
    fullName: string;
    cvv: string;
    expirationDate: Date;
  }