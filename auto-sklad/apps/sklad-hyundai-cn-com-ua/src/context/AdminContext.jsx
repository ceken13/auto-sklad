import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [cars, setCars] = useState([]);

  //  завантаження з localStorage
  useEffect(() => {
    const savedCars = localStorage.getItem('adminCars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }
  }, []);

  //  збереження в localStorage
  useEffect(() => {
    localStorage.setItem('adminCars', JSON.stringify(cars));
  }, [cars]);

  //  додати авто
  const addCar = (car) => {
    setCars((prev) => [...prev, { ...car, id: Date.now() }]);
  };

  //  видалити
  const deleteCar = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  //  редагувати (поки на майбутнє)
  const updateCar = (updatedCar) => {
    setCars((prev) => prev.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
  };

  return <AdminContext.Provider value={{ cars, addCar, deleteCar, updateCar }}>{children}</AdminContext.Provider>;
}

//  hook
export const useAdmin = () => useContext(AdminContext);
