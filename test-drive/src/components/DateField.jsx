import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';

dayjs.locale('uk');

export default function DateField({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          onChange(newValue ? newValue.format('YYYY-MM-DD') : '');
        }}
        minDate={dayjs()}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
