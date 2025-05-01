
import React from "react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for shopping with Desi Pet Paradise.",
      duration: 5000,
    });
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </header>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.pet.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-32 h-32">
                          <img
                            src={item.pet.image}
                            alt={item.pet.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{item.pet.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.pet.breed} • {item.pet.age} {item.pet.age === 1 ? "year" : "years"}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.pet.id)}
                            >
                              <X size={18} />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.pet.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.pet.id, parseInt(e.target.value) || 1)
                                }
                                className="w-16 h-8 mx-2 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.pet.id, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                            <div className="font-bold text-lg text-spice-500">
                              ₹{(item.pet.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any pets to your cart yet.
            </p>
            <Link to="/shop">
              <Button>Browse Pets</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
