
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-spice-500 to-peacock-500 bg-clip-text text-transparent">
            Desi Pet Paradise
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <Link to="/shop">
                    <Button variant="ghost">Shop</Button>
                  </Link>
                  <Link to="/cart" className="relative">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-spice-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}

              {user.role === "admin" && (
                <Link to="/admin">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={logout} 
                      className="w-full flex items-center cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
