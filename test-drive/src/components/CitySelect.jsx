import { Select, MenuItem } from '@mui/material';

export default function CitySelect({ value, onChange, cities }) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)} style={{ minWidth: 220, marginBottom: 20 }}>
      {cities.map((city) => (
        <MenuItem key={city} value={city}>
          {city}
        </MenuItem>
      ))}
    </Select>
  );
}
