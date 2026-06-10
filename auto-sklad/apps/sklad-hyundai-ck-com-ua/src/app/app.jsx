import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsDetails } from '../pages/CarsDetails';
import { CarsRequest } from '../pages/CarsRequest';
import { ComparePage } from '../pages/ComparePage';
import { NotFound } from '../pages/NotFound';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car-details/:id" element={<CarsDetails />} />
        <Route path="/car-request/:id" element={<CarsRequest />} />
        <Route path="/compare/:vinCodes" element={<ComparePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
