import { FormControl, Select, MenuItem } from '@mui/material';

export default function CitySelect({ value, onChange, cities }) {
  return (
    <FormControl fullWidth>
      <Select
        value={value ?? ''}
        sx={{
          textAlign: 'left',
          '& .MuiSelect-select': {
            textAlign: 'left',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 0,
          },
        }}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: '#999' }}>Оберіть місто</span>;
          }

          if (selected === 'ALL') {
            return 'Будь-яке';
          }

          return selected;
        }}
      >
        {/* default placeholder item */}
        <MenuItem value="" disabled>
          Оберіть місто
        </MenuItem>

        {/* ALL option */}
        <MenuItem value="ALL">Будь-яке</MenuItem>

        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
