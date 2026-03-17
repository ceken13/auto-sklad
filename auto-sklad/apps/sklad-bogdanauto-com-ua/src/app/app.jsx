import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsDetails } from '../pages/CarsDetails';
export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car-details" element={<CarsDetails />} />
      </Routes>
    </div>
  );
}

export default App;
