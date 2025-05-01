
import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { useAdoption } from "@/contexts/AdoptionContext";
import { petData } from "@/data/petData";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdoptionRequests = () => {
  const { adoptionRequests, updateRequestStatus } = useAdoption();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  const filteredRequests = statusFilter === "all"
    ? [...adoptionRequests].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : adoptionRequests
        .filter((req) => req.status === statusFilter)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const selectedRequestData = adoptionRequests.find(
    (req) => req.id === selectedRequest
  );
  const selectedPet = selectedRequestData
    ? petData.find((p) => p.id === selectedRequestData.petId)
    : null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="p-6 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Adoption Requests</h1>
          <p className="text-muted-foreground">
            Manage adoption requests from users
          </p>
        </header>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="font-semibold">All Requests</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Pet</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => {
                    const pet = petData.find((p) => p.id === request.petId);
                    return (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{pet?.name || "Unknown pet"}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRequest(request.id)}
                          >
                            View
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:text-green-800"
                                onClick={() => updateRequestStatus(request.id, "approved")}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:text-red-800"
                                onClick={() => updateRequestStatus(request.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No adoption requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={selectedRequest !== null} onOpenChange={() => setSelectedRequest(null)}>
          {selectedRequestData && selectedPet && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Adoption Request Details</DialogTitle>
                <DialogDescription>
                  Request #{selectedRequestData.id} submitted on {selectedRequestData.date}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-medium mb-2">Applicant Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {selectedRequestData.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedRequestData.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {selectedRequestData.phone}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {selectedRequestData.address}
                    </div>
                  </div>
                  
                  <h3 className="font-medium mt-6 mb-2">Reason for Adoption</h3>
                  <p className="text-sm">{selectedRequestData.reason}</p>
                  
                  <div className="mt-6 space-x-2">
                    <span className="font-medium">Current Status:</span>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        selectedRequestData.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedRequestData.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedRequestData.status.charAt(0).toUpperCase() + selectedRequestData.status.slice(1)}
                    </span>
                  </div>
                  
                  {selectedRequestData.status === "pending" && (
                    <div className="mt-6 space-x-2">
                      <Button
                        variant="outline"
                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:text-green-800"
                        onClick={() => {
                          updateRequestStatus(selectedRequestData.id, "approved");
                          setSelectedRequest(null);
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:text-red-800"
                        onClick={() => {
                          updateRequestStatus(selectedRequestData.id, "rejected");
                          setSelectedRequest(null);
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Pet Information</h3>
                  <div className="rounded-lg overflow-hidden border">
                    <img
                      src={selectedPet.image}
                      alt={selectedPet.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold">{selectedPet.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedPet.breed} • {selectedPet.age} {selectedPet.age === 1 ? "year" : "years"}
                      </p>
                      <p className="mt-2 text-sm">{selectedPet.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Price:</span> ₹{selectedPet.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default AdoptionRequests;
