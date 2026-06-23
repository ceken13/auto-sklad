import DealerCard from './DealerCard';
import { Box } from '@mui/material';

export default function DealerList({ dealers, onSelect }) {
  const safeDealers = Array.isArray(dealers) ? dealers : [];
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
        mt: 2,
        mb: 1,
      }}
    >
      {safeDealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} onSelect={onSelect} />
      ))}
    </Box>
  );
}
