import { createContext, useContext, useState } from 'react';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareCars, setCompareCars] = useState([]);

  const toggleCompare = (car) => {
    const exists = compareCars.some((item) => item.id === car.id);

    if (exists) {
      setCompareCars(compareCars.filter((item) => item.id !== car.id));
      return;
    }

    if (compareCars.length >= 4) {
      return;
    }

    setCompareCars([...compareCars, car]);
  };

  const removeCar = (carId) => {
    setCompareCars((prev) => prev.filter((car) => car.id !== carId));
  };

  const clearCompare = () => {
    setCompareCars([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareCars,
        toggleCompare,
        removeCar,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
