
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";
import Donate from "./pages/Donate";
import BreadDonation from "./pages/BreadDonation";
import NotFound from "./pages/NotFound";
import BakeryDetail from "./pages/BakeryDetail";
import BookingForm from "./pages/BookingForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="map" element={<Map />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="profile" element={<Profile />} />
            <Route path="donate" element={<Donate />} />
            <Route path="bread-donation" element={<BreadDonation />} />
          </Route>
          <Route path="/bakery/:id" element={<BakeryDetail />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
