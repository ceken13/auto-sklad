import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsDetails } from '../pages/CarsDetails';
import { CarsRequest } from '../pages/CarsRequest';
import { UserAuthorizationPage } from '../pages/UserAuthorizationPage';
import { UserPage } from '../pages/UserPage';
import { PrivateRoute } from '../components/PrivateRoute';
import { AdminProvider } from '../context/AdminContext';
import { NotFound } from '../pages/NotFound';
import { AdminConfigurationEnrichments } from '../pages/AdminConfigurationEnrichments';
import { AdminOrganizationsPage } from '../pages/AdminOrganizationsPage';
import { AdminUsersListPage } from '../pages/AdminUsersListPage';
import { ComparePage } from '../pages/ComparePage';

export function App() {
  return (
    <div>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car-details/:id" element={<CarsDetails />} />
          <Route path="/car-request/:id" element={<CarsRequest />} />
          <Route path="/login" element={<UserAuthorizationPage />} />
          <Route path="/compare/:vinCodes" element={<ComparePage />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route path="/admin/configuration-enrichments" element={<AdminConfigurationEnrichments />} />
          <Route path="/admin/organizations" element={<AdminOrganizationsPage />} />
          <Route path="/admin/users-list" element={<AdminUsersListPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminProvider>
    </div>
  );
}

export default App;
