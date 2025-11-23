import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BankSidebar } from "@/components/BankSidebar";
import { ChatBot } from "@/components/ChatBot";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import OpenAccount from "./pages/OpenAccount";
import Transaction from "./pages/Transaction";
import AILogs from "./pages/AILogs";
import ApplyLoan from "./pages/ApplyLoan";
import CreateFD from "./pages/CreateFD";
import ApplyCard from "./pages/ApplyCard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                      <BankSidebar />
                      <main className="flex-1 p-8 overflow-auto bg-background">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/open-account" element={<OpenAccount />} />
                          <Route path="/transaction" element={<Transaction />} />
                          <Route path="/ai-logs" element={<AILogs />} />
                          <Route path="/apply-loan" element={<ApplyLoan />} />
                          <Route path="/create-fd" element={<CreateFD />} />
                          <Route path="/apply-card" element={<ApplyCard />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                    <ChatBot />
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
