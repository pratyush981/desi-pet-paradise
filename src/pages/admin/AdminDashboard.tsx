
import React from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { petData, adoptionRequests } from "@/data/petData";

const AdminDashboard = () => {
  const totalPets = petData.length;
  const availablePets = petData.filter((pet) => pet.available).length;
  const pendingRequests = adoptionRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const approvedRequests = adoptionRequests.filter(
    (req) => req.status === "approved"
  ).length;

  const categoryCounts = petData.reduce((acc, pet) => {
    acc[pet.category] = (acc[pet.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="p-6 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Desi Pet Paradise admin panel
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Pets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availablePets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Adoption Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingRequests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved Adoptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{approvedRequests}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pet Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map(([category, count]) => (
                  <div key={category} className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span>{category}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-2 rounded bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-spice-500"
                          style={{
                            width: `${(count / totalPets) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Adoption Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adoptionRequests.slice(0, 5).map((request) => {
                  const pet = petData.find((p) => p.id === request.petId);
                  return (
                    <div
                      key={request.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">
                          For: {pet?.name} ({pet?.breed})
                        </p>
                      </div>
                      <div>
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
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
