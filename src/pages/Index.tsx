
import { Button } from "@/components/ui/button";
import { PetCard } from "@/components/PetCard";
import { Navbar } from "@/components/Navbar";
import { petData } from "@/data/petData";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is logged in, redirect them to the appropriate page
    if (!isLoading && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "user") {
        navigate("/shop");
      }
    }
  }, [user, isLoading, navigate]);

  // If still loading or user is logged in, don't render content
  if (isLoading || user) {
    return null;
  }
  
  // Get featured pets (first 4 pets)
  const featuredPets = petData.slice(0, 4);

  return (
    <div className="min-h-screen bg-pattern-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-spice-500 to-peacock-500 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Welcome to Desi Pet Paradise
          </h1>
          <p className="text-xl md:text-2xl text-center mb-10 max-w-3xl">
            Your one-stop destination for adorable, loving pets with authentic Indian names and experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button 
                size="lg"
                className="bg-white text-spice-500 hover:bg-gray-100 hover:text-spice-600">
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent backdrop-blur-sm border-white hover:bg-white/10">
                Browse as Guest
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 ornament">
            Why Choose Desi Pet Paradise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-spice-100 text-spice-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Health Guaranteed</h3>
              <p className="text-muted-foreground">
                All our pets are thoroughly examined by veterinarians and come with health certificates.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-peacock-100 text-peacock-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                  <path d="m7.5 4.27 9 5.15" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" x2="12" y1="22" y2="12" />
                  <circle cx="18.5" cy="15.5" r="2.5" />
                  <path d="M20.27 17.27 22 19" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Adoption</h3>
              <p className="text-muted-foreground">
                Our straightforward adoption process ensures you can welcome your new pet home quickly.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gulabi-100 text-gulabi-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Post-Adoption Support</h3>
              <p className="text-muted-foreground">
                We provide continuous guidance and support even after you bring your pet home.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Pets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Pets</h2>
          <p className="text-center text-muted-foreground mb-12">
            Meet some of our adorable companions waiting for their forever homes
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet) => (
              <div key={pet.id} onClick={() => navigate("/login")} className="cursor-pointer">
                <PetCard pet={pet} showAdoptButton={false} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/login">
              <Button size="lg">View All Pets</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-spice-500 to-peacock-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Welcome a New Member?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Login now to explore our full collection of pets and start your adoption journey.
          </p>
          <Link to="/login">
            <Button 
              size="lg"
              className="bg-white text-spice-500 hover:bg-gray-100 hover:text-spice-600">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Desi Pet Paradise</h3>
              <p className="text-gray-400">
                Your trusted partner for finding your perfect pet companion.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Pet Adoption</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pet Care Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Veterinary Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pet Training</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <address className="not-italic text-gray-400">
                123 Pet Street, Delhi<br />
                India - 110001<br /><br />
                <a href="tel:+919876543210" className="hover:text-white">+91 9876543210</a><br />
                <a href="mailto:info@desipetparadise.com" className="hover:text-white">info@desipetparadise.com</a>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Desi Pet Paradise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
