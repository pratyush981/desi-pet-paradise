
import React from "react";
import { Pet } from "@/data/petData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface PetCardProps {
  pet: Pet;
  showAdoptButton?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, showAdoptButton = true }) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden pet-card">
      <div className="h-48 overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{pet.name}</h3>
            <p className="text-sm text-muted-foreground">
              {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"}
            </p>
          </div>
          <span className="font-bold text-spice-500">₹{pet.price.toLocaleString()}</span>
        </div>
        <p className="text-sm mt-2 line-clamp-2">{pet.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={() => addToCart(pet)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Buy
        </Button>
        
        {showAdoptButton && (
          <Link to={`/adopt/${pet.id}`} className="flex-1">
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-spice-500 to-gulabi-500"
            >
              Adopt
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
