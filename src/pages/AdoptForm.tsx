
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { petData } from "@/data/petData";
import { useAdoption } from "@/contexts/AdoptionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdoptForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addAdoptionRequest } = useAdoption();
  
  const petId = id ? parseInt(id) : 0;
  const pet = petData.find((p) => p.id === petId);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Pet not found</h1>
          <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
        </div>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      addAdoptionRequest({
        petId: pet.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        reason: formData.reason,
      });
      
      setIsSubmitting(false);
      navigate("/shop");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Adopt {pet.name}</h1>
            <p className="text-muted-foreground">
              Please complete this form to apply for adoption
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <Card className="overflow-hidden h-full">
                <div className="h-64 md:h-72">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div>
                    <h2 className="font-bold text-xl">{pet.name}</h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"}
                    </p>
                    <p className="text-sm">{pet.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Adoption Application</CardTitle>
                  <CardDescription>
                    Provide your information to apply for adopting {pet.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Your complete address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">
                        Why do you want to adopt {pet.name}?
                      </Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        placeholder="Tell us about your living situation, experience with pets, and why you want to adopt this pet..."
                        rows={4}
                        value={formData.reason}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="pt-4 flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/shop")}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptForm;
