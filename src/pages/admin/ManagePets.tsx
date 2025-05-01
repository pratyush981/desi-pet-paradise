
import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { petData, petCategories } from "@/data/petData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Note: In a real application, this would be connected to a backend to actually save changes

const ManagePets = () => {
  const [pets, setPets] = useState(petData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: 1,
    price: 1000,
    description: "",
    image: "",
    category: "",
  });

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Convert numeric fields
    if (name === "age" || name === "price") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPet = () => {
    const newPet = {
      id: Date.now(),
      ...formData,
      available: true,
    };

    setPets((prevPets) => [...prevPets, newPet]);
    setIsAddDialogOpen(false);
    setFormData({
      name: "",
      species: "",
      breed: "",
      age: 1,
      price: 1000,
      description: "",
      image: "",
      category: "",
    });

    toast({
      title: "Pet added",
      description: `${newPet.name} has been added to the catalog.`,
      duration: 3000,
    });
  };

  const handleEditPet = () => {
    if (selectedPet === null) return;

    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === selectedPet
          ? {
              ...pet,
              name: formData.name,
              species: formData.species,
              breed: formData.breed,
              age: formData.age,
              price: formData.price,
              description: formData.description,
              image: formData.image,
              category: formData.category,
            }
          : pet
      )
    );

    setIsEditDialogOpen(false);
    setSelectedPet(null);

    toast({
      title: "Pet updated",
      description: `${formData.name} has been updated.`,
      duration: 3000,
    });
  };

  const handleDeletePet = (id: number) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    
    toast({
      title: "Pet deleted",
      description: "The pet has been removed from the catalog.",
      duration: 3000,
    });
  };

  const openEditDialog = (id: number) => {
    const pet = pets.find((p) => p.id === id);
    if (!pet) return;

    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      price: pet.price,
      description: pet.description,
      image: pet.image,
      category: pet.category,
    });

    setSelectedPet(id);
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setFormData({
      name: "",
      species: "",
      breed: "",
      age: 1,
      price: 1000,
      description: "",
      image: "",
      category: "",
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="p-6 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage Pets</h1>
            <p className="text-muted-foreground">
              Add, edit, or remove pets from the catalog
            </p>
          </div>
          <Button onClick={openAddDialog}>Add New Pet</Button>
        </header>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="font-semibold">Pet Catalog</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search pets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60"
              />
            </div>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (₹)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>{pet.id}</TableCell>
                    <TableCell>
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{pet.name}</TableCell>
                    <TableCell>{pet.breed}</TableCell>
                    <TableCell>{pet.category}</TableCell>
                    <TableCell>{pet.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(pet.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeletePet(pet.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Add Pet Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Pet</DialogTitle>
              <DialogDescription>
                Add a new pet to your catalog
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Pet name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {petCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species">Species</Label>
                  <Input
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    placeholder="Species"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="Breed"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Pet description"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPet}>Add Pet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Pet Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Pet</DialogTitle>
              <DialogDescription>
                Update the pet information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Pet Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Pet name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {petCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-species">Species</Label>
                  <Input
                    id="edit-species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    placeholder="Species"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-breed">Breed</Label>
                  <Input
                    id="edit-breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="Breed"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age (years)</Label>
                  <Input
                    id="edit-age"
                    name="age"
                    type="number"
                    min="1"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Pet description"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditPet}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManagePets;
