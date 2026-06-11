import React from 'react';
import { Dialog, DialogContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function SuccessModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ textAlign: 'center', position: 'relative', p: 9 }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography fontWeight="bold" mb={3} sx={{ fontSize: { xs: '20px', sm: '30px' } }}>
          Дякуємо, запит прийнято.
        </Typography>
        <Typography sx={{ fontSize: '16px' }}>Ми зв'яжемося з вами найближчим часом</Typography>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessModal;
