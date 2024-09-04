import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Travel from './pages/tripsTable';

import SignInPage from './pages/signInPage';
import ProtectedRoute from './main components/ProtectedRoutes';
import MainLayout from './layout/main-layout';
import Accomodation from './pages/accomodation';
import { useEffect, useState } from 'react';
import { CreateUserForm } from './main components/CreateUserForm';
import CreateUser from './pages/createUser';

import UserManager from './pages/userManager';
import { UpdateProfileForm } from './main components/UpdateProfileForm';
import ProfilePage from './pages/ProfilePage';
import { Profiles } from './pages/Profiles';
import FinancialPage from './pages/financialPage';
import TravelV2Page from './pages/travelV2Page';
import Trip from './pages/trip';
import TripsTable from './pages/tripsTable';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []); // Empty depend
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />

      <Route path="/get-started" element={<CreateUser />} />
      <Route element={<MainLayout />}>
        <Route
          path="/travels-old"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path= "/"
          element={
            <ProtectedRoute>
              <TripsTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financial"
          element={
            <ProtectedRoute>
              <FinancialPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip/:tripId"
          element={
            <ProtectedRoute>
              <Trip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accommodation"
          element={
            <ProtectedRoute>
              <Accomodation />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
