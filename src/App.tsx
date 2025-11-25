import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import Landing from "./pages/Landing";
import Index from "./pages/Index";        // Chat page (for now)
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";      // ✅ ADD THIS IMPORT
import Subscribe from "./pages/Subscribe";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page is the homepage */}
            <Route path="/" element={<Landing />} />

            {/* Signup page */}
            <Route path="/signup" element={<SignUp />} />   {/* ✅ ADD THIS ROUTE */}
            <Route path="/subscribe" element={<Subscribe />} />
            {/* Dream chat (old main page) */}
            <Route path="/chat" element={<Index />} />
             <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
