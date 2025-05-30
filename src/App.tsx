import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DonationProvider } from './context/DonationContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDashboard from './pages/dashboard/RestaurantDashboard';
import VolunteerDashboard from './pages/dashboard/VolunteerDashboard';
import DonationDetails from './pages/donations/DonationDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Toast from './components/ui/Toast';

function App() {
  return (
    <AuthProvider>
      <DonationProvider>
        <ToastProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/restaurant/dashboard" 
                    element={
                      <ProtectedRoute userType="restaurant">
                        <RestaurantDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/volunteer/dashboard" 
                    element={
                      <ProtectedRoute userType="volunteer">
                        <VolunteerDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/donation/:id" 
                    element={<DonationDetails />} 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <Toast />
            </div>
          </Router>
        </ToastProvider>
      </DonationProvider>
    </AuthProvider>
  );
}

export default App;