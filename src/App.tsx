
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AdoptionProvider } from "./contexts/AdoptionContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AdoptForm from "./pages/AdoptForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdoptionRequests from "./pages/admin/AdoptionRequests";
import ManagePets from "./pages/admin/ManagePets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper for User role
const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>; // You can create a nice loading component
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role === "admin") {
    return <Navigate to="/admin" />;
  }
  
  return <>{children}</>;
};

// Protected route wrapper for Admin role
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>; // You can create a nice loading component
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* User routes */}
      <Route path="/shop" element={<UserRoute><Shop /></UserRoute>} />
      <Route path="/cart" element={<UserRoute><Cart /></UserRoute>} />
      <Route path="/adopt/:id" element={<UserRoute><AdoptForm /></UserRoute>} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/adoptions" element={<AdminRoute><AdoptionRequests /></AdminRoute>} />
      <Route path="/admin/pets" element={<AdminRoute><ManagePets /></AdminRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <AdoptionProvider>
            <Toaster />
            <Sonner />
            <AppRouter />
          </AdoptionProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
