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
    </Box>
  );
}

export default OptionalEquipment;
