import { Box, Typography, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

export function TradeInFileUpload({ control }) {
  const [error, setError] = useState('');

  const allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10 MB

  return (
    <Controller
      name="photos"
      control={control}
      render={({ field }) => {
        const handleChange = (e) => {
          const files = Array.from(e.target.files);

          const validFiles = [];
          let errorMessage = '';

          files.forEach((file) => {
            if (!allowedFormats.includes(file.type)) {
              errorMessage = 'Дозволені тільки JPG, PNG, WEBP формати';
              return;
            }

            if (file.size > maxSize) {
              errorMessage = 'Розмір одного фото не може перевищувати 10 МБ';
              return;
            }

            // перевірка дубля
            const alreadyExists = field.value?.some((item) => item.name === file.name && item.size === file.size);

            if (!alreadyExists) {
              validFiles.push(file);
            }
          });

          if (errorMessage) {
            setError(errorMessage);
          } else {
            setError('');
          }

          field.onChange([...(field.value || []), ...validFiles]);

          // щоб можна було повторно вибрати той самий файл
          e.target.value = '';
        };

        const removePhoto = (index) => {
          const updated = field.value.filter((_, i) => i !== index);

          field.onChange(updated);
        };

        return (
          <Box>
            <Box
              component="label"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 6,
                mb: 3,
                cursor: 'pointer',
                width: 'fit-content',
                color: '#0f6b5c',

                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <AttachFileIcon />

              <Typography
                sx={{
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'dashed',
                  textUnderlineOffset: '4px',
                  fontSize: '16px',
                }}
              >
                Завантажити фото автомобіля
                <span style={{ color: 'red' }}>*</span>
              </Typography>

              <input hidden type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleChange} />
            </Box>

            {error && (
              <Typography
                color="error"
                sx={{
                  mb: 2,
                  fontSize: 14,
                }}
              >
                {error}
              </Typography>
            )}

            {field.value?.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  mb: 4,
                }}
              >
                {field.value.map((file, index) => (
                  <Box
                    key={`${file.name}-${index}`}
                    sx={{
                      position: 'relative',
                    }}
                  >
                    <Box
                      component="img"
                      src={URL.createObjectURL(file)}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid #ccc',
                      }}
                    />

                    <IconButton
                      onClick={() => removePhoto(index)}
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        background: '#fff',
                        boxShadow: '0 2px 5px rgba(0,0,0,.2)',

                        '&:hover': {
                          background: '#fff',
                          color: 'red',
                        },
                      }}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
}

export default TradeInFileUpload;
