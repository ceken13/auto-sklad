import { Box, Skeleton } from '@mui/material';

export function CarListSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* TOP BAR */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="rectangular" width={160} height={40} />
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
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i} sx={{ borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={380} />
          </Box>
        ))}
      </Box>

      {/* PAGINATION */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Skeleton variant="rectangular" width={200} height={40} />
      </Box>
    </Box>
  );
}
