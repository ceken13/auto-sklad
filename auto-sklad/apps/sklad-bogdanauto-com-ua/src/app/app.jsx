import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsDetails } from '../pages/CarsDetails';
import { CarsRequest } from '../pages/CarsRequest';
import { UserAuthorizationPage } from '../pages/UserAuthorizationPage';
import { UserPage } from '../pages/UserPage';
import { PrivateRoute } from '../components/PrivateRoute';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car-details/:id" element={<CarsDetails />} />
        <Route path="/car-request/:id" element={<CarsRequest />} />
        <Route path="/login" element={<UserAuthorizationPage />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
