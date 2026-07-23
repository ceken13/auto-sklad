import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import TestDriveForm from './TestDriveForm';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { sendTestDriveRequest } from '../../api/testDrive.api';

export default function TestDriveModal({ open, onClose, car }) {
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (data) => {
    try {
      await sendTestDriveRequest(data);
      setSuccessOpen(true);
    } catch (error) {
      console.error(error);
      alert('Помилка відправки заявки');
    }
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
