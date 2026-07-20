import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    trimLevels: [],
    engines: [],
    fuelTypes: [],
    transmissions: [],
    driveTypes: [],
    exteriorColors: [],
    interiorColors: [],
    years: [],
    cities: [],
    regularPrice: [0, 5000000],
    availableCars: false,
    inUkraineCars: false,
    usedCars: undefined,
    showUsedCars: false,
    showNewCars: false,
    specialOfferCars: false,
    pickUpOfferCars: false,
  });

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key]?.includes(value);

      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== value) : [...(prev[key] || []), value],
      };
    });
  };

  const setPrice = (value) => {
    setFilters((prev) => ({
      ...prev,
      regularPrice: value,
    }));
  };
  const toggleBooleanFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const setBooleanFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const setCarStatus = (used, isNew) => {
    let usedCars;

    if ((used && isNew) || (!used && !isNew)) {
      usedCars = undefined;
    } else if (used) {
      usedCars = true;
    } else {
      usedCars = false;
    }

    setFilters((prev) => ({
      ...prev,
      showUsedCars: used,
      showNewCars: isNew,
      usedCars,
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      models: [],
      trimLevels: [],
      engines: [],
      fuelTypes: [],
      transmissions: [],
      driveTypes: [],
      exteriorColors: [],
      interiorColors: [],
      years: [],
      cities: [],
      regularPrice: [0, 5000000],
      availableCars: false,
      inUkraineCars: false,
      usedCars: undefined,
      showUsedCars: false,
      showNewCars: false,
      specialOfferCars: false,
      pickUpOfferCars: false,
    });
  };

  return (
    <FilterContext.Provider
      value={{ filters, toggleFilter, clearFilters, setPrice, toggleBooleanFilter, setBooleanFilter, setCarStatus }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => useContext(FilterContext);
