import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import Landing from "./pages/Landing";     // 👈 ADD THIS
import Index from "./pages/Index";         // Chat page (will become dashboard later)
import NotFound from "./pages/NotFound";
// If you already created these, you can add them too:
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Subscribe from "./pages/Subscribe";
// import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>

            {/* 👇 NEW: Landing page becomes the homepage */}
            <Route path="/" element={<Landing />} />

            {/* 👇 Move your chat app to its own route */}
            <Route path="/chat" element={<Index />} />
            {/* or /dashboard once you build it */}

            {/* Authentication + subscription (if created)
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/dashboard" element={<Dashboard />} />
            */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
