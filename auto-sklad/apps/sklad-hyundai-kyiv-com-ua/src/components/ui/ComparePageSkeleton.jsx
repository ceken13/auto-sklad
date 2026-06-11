import { Box, Skeleton } from '@mui/material';

export function ComparePageSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* TOP BAR */}
      <Box
        sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexDirection: 'column', marginTop: '30px' }}
      >
        <Skeleton variant="text" width={400} height={80} />
        <Skeleton variant="text" width={250} height={50} />
        <Skeleton variant="text" width={180} height={25} />
      </Box>
      {/* CARDS */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: '1fr',
          },
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ borderRadius: 2 }}>
          <Skeleton variant="rectangular" height={380} />
        </Box>
      </Box>
    </Box>
  );
}
