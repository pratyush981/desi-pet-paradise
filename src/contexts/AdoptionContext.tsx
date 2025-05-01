
import React, { createContext, useContext, useState, useEffect } from "react";
import { AdoptionRequest, adoptionRequests as initialRequests } from "../data/petData";
import { useToast } from "@/components/ui/use-toast";

interface AdoptionContextType {
  adoptionRequests: AdoptionRequest[];
  addAdoptionRequest: (request: Omit<AdoptionRequest, "id" | "status" | "date">) => void;
  updateRequestStatus: (id: number, status: "pending" | "approved" | "rejected") => void;
  getRequestById: (id: number) => AdoptionRequest | undefined;
}

const AdoptionContext = createContext<AdoptionContextType | undefined>(undefined);

export const AdoptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedRequests = localStorage.getItem("adoptionRequests");
    if (storedRequests) {
      setAdoptionRequests(JSON.parse(storedRequests));
    } else {
      setAdoptionRequests(initialRequests);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adoptionRequests", JSON.stringify(adoptionRequests));
  }, [adoptionRequests]);

  const addAdoptionRequest = (request: Omit<AdoptionRequest, "id" | "status" | "date">) => {
    const newRequest: AdoptionRequest = {
      ...request,
      id: Date.now(),
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };

    setAdoptionRequests(prev => [...prev, newRequest]);
    toast({
      title: "Adoption request submitted",
      description: "Your adoption request has been sent. We'll contact you soon.",
      duration: 3000,
    });
  };

  const updateRequestStatus = (id: number, status: "pending" | "approved" | "rejected") => {
    setAdoptionRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status } : req
      )
    );
    toast({
      title: "Status updated",
      description: `Request #${id} status changed to ${status}.`,
      duration: 2000,
    });
  };

  const getRequestById = (id: number) => {
    return adoptionRequests.find(req => req.id === id);
  };

  return (
    <AdoptionContext.Provider
      value={{
        adoptionRequests,
        addAdoptionRequest,
        updateRequestStatus,
        getRequestById
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoption = () => {
  const context = useContext(AdoptionContext);
  if (context === undefined) {
    throw new Error("useAdoption must be used within an AdoptionProvider");
  }
  return context;
};
