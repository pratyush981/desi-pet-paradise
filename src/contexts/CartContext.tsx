
import React, { createContext, useContext, useState, useEffect } from "react";
import { Pet } from "../data/petData";
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  pet: Pet;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (pet: Pet) => void;
  removeFromCart: (petId: number) => void;
  updateQuantity: (petId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pet: Pet) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.pet.id === pet.id);
      
      if (existingItem) {
        toast({
          title: "Already in cart",
          description: `${pet.name} is already in your cart.`,
          duration: 2000,
        });
        return prevCart;
      }
      
      toast({
        title: "Added to cart",
        description: `${pet.name} has been added to your cart.`,
        duration: 2000,
      });
      
      return [...prevCart, { pet, quantity: 1 }];
    });
  };

  const removeFromCart = (petId: number) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.pet.id === petId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.pet.name} has been removed from your cart.`,
          duration: 2000,
        });
      }
      return prevCart.filter(item => item.pet.id !== petId);
    });
  };

  const updateQuantity = (petId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.pet.id === petId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.pet.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
