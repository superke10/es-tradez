import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
// Add page imports here
import Home from "./pages/Home";
import Forex from "./pages/markets/Forex";
import Cryptocurrency from "./pages/markets/Cryptocurrency";
import Stocks from "./pages/markets/Stocks";
import Futures from "./pages/markets/Futures";
import AboutUs from "./pages/company/AboutUs";
import TradingSignals from "./pages/company/TradingSignals";
import Performance from "./pages/company/Performance";
import Contact from "./pages/company/Contact";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/markets/forex" element={<Forex />} />
      <Route path="/markets/cryptocurrency" element={<Cryptocurrency />} />
      <Route path="/markets/stocks" element={<Stocks />} />
      <Route path="/markets/futures" element={<Futures />} />
      <Route path="/company/about" element={<AboutUs />} />
      <Route path="/company/signals" element={<TradingSignals />} />
      <Route path="/company/performance" element={<Performance />} />
      <Route path="/company/contact" element={<Contact />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App