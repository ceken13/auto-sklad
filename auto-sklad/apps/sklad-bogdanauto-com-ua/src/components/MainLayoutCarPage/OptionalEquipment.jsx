import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';

export function OptionalEquipment({ car }) {
  const styles = getStyles(theme);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderValue = (value) => {
    if (value === true) return '+';
    if (value === false) return '–';
    return value;
  };

  return (
    <Box sx={{ mt: 5 }}>
      {car?.specs?.length > 0 && (
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, fontSize: '24px' }}>
          Опції
        </Typography>
      )}
      {car?.specs?.map((section, index) => {
        const isOpen = openIndex === index;

        return (
          <Box key={index}>
            {/* HEADER */}
            <Box
              onClick={() => toggle(index)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                p: 2,
                border: isOpen ? '1px solid #f5f5f5' : '1px solid #E0E0E0',
                backgroundColor: isOpen ? '#f5f5f5' : '#fff',
                transition: 'background-color 0.2s ease',

                '&:hover': {
                  backgroundColor: isOpen ? '#f5f5f5' : '#fafafa',
                  border: isOpen ? '1px solid #f5f5f5' : '1px solid #f5f5f5',
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>{section.title}</Typography>

              <Typography sx={{ fontSize: '20px' }}>
                <ExpandMoreIcon
                  sx={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '0.3s',
                  }}
                />
              </Typography>
            </Box>

            {/* CONTENT */}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box sx={{ pb: 2 }}>
                {section.items.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography sx={{ color: '#555' }}>{item.label}</Typography>

                    <Typography sx={{ fontWeight: 500 }}>{renderValue(item.value)}</Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        );
      })}
      {car?.coEmissions && (
        <Box sx={{ mt: 8 }}>
          <Typography sx={{ fontSize: '14px', mb: 1 }}>
            * Дані показники визначені Європейським центром сертифікації на основі оригінальних стендових випробувань.
            Реальні експлуатаційні показники можуть відрізнятися в залежності від географічного положення, дорожніх і
            погодних умов, щільності руху, технічного стану автомобіля, якості вживаного палива, стилю і навиків
            керування.
          </Typography>
          <Typography sx={{ fontSize: '14px', mb: 1 }}>
            Діапазон значень викидів СО2 або витрат палива враховує наявність різних об'ємів двигуна та/або різних
            коробок передач (механічна чи автоматична). Офіційні дані щодо питомих викидів, наведені в таблиці,
            відповідають комбінованому циклу.
          </Typography>
          <Typography sx={{ fontSize: '14px', mb: 1 }}>
            Безоплатно ознайомитися з електронною версією довідника щодо питомих витрат палива та питомих викидів CO2 ,
            який містить дані для всіх моделей нових легкових автомобілів, можливо в будь-якому місці продажу або на
            вебсайті{' '}
            <a href="https://hyundai.com.ua/" target="_blank" style={{ color: '#000', textDecoration: 'none' }}>
              hyundai.com.ua
            </a>
            .
          </Typography>
          <Typography sx={{ fontSize: '14px', mb: 1 }}>
            Крім енергетичної ефективності (економічності) легкового автомобіля, важливу роль у формуванні фактичних
            витрат палива та питомих викидів CO2 легкового автомобіля відіграють стиль керування, а також інші фактори,
            не пов’язані безпосередньо з конструкцією. CO2 є основним парниковим газом, який має найбільший вплив на
            глобальне потепління.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default OptionalEquipment;
