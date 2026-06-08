import { Box, Skeleton } from '@mui/material';

export function CarPageSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
      <Box flex={1}>
        <Skeleton variant="rectangular" height={300} />
      </Box>

      <Box flex={1}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={30} />
        <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
      </Box>
    </Box>
  );
}
