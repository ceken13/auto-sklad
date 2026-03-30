import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsDetails } from '../pages/CarsDetails';
import { CarsRequest } from '../pages/CarsRequest';
export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car-details/:id" element={<CarsDetails />} />
        <Route path="/car-request/:id" element={<CarsRequest />} />
      </Routes>
    </div>
  );
}

export default App;
