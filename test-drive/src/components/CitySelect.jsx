import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

export default function CitySelect({ value, onChange, cities, submitAttempted }) {
  const cityError = submitAttempted && !value;

  return (
    <FormControl fullWidth error={cityError}>
      <Select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: cityError ? '#999' : '#999' }}>Оберіть місто</span>;
          }

          if (selected === 'ALL') {
            return 'Будь-яке';
          }

          return selected;
        }}
        sx={{
          textAlign: 'left',
          '& .MuiSelect-select': {
            textAlign: 'left',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 0,
            borderColor: cityError ? 'red' : undefined,
          },
        }}
      >
        <MenuItem value="" disabled>
          Оберіть місто
        </MenuItem>

        <MenuItem value="ALL">Будь-яке</MenuItem>

        {Array.isArray(cities) &&
          cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
      </Select>

      {cityError && <FormHelperText style={{ color: 'red' }}>Оберіть місто</FormHelperText>}
    </FormControl>
  );
}
