import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import TestDriveForm from './TestDriveForm';
import { SuccessModal } from '../SuccessModal/SuccessModal';

export default function TestDriveModal({ open, onClose, car }) {
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (data) => {
    console.log('Тест-драйв:', data);

    // тут потім буде API
    // await sendTestDriveRequest(data);

    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: '900', fontSize: '24px' }}>
          ТЕСТ-ДРАЙВ
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TestDriveForm car={car} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>

      <SuccessModal open={successOpen} onClose={handleSuccessClose} />
    </>
  );
}
