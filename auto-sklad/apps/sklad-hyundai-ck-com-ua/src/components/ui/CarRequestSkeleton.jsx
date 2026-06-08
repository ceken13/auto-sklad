import { Box, Skeleton } from '@mui/material';

export function CarRequestSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={350} height={80} sx={{ marginTop: '50px' }} />
      <Skeleton variant="text" width={350} height={60} sx={{ margin: '20px auto' }} />
      <Skeleton variant="text" width={350} height={30} sx={{ mb: 2, marginTop: '50px' }} />
      <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
        {/* LEFT: FORM */}

        <Box sx={{ flex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} sx={{ mb: 2, width: '30%' }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="rectangular" height={55} />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <Box key={i} sx={{ mb: 2, width: '47%' }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="rectangular" height={55} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
            <Box sx={{ mb: 2, width: '100%' }}>
              <Skeleton variant="rectangular" height={100} />
            </Box>
          </Box>
        </Box>

        {/* RIGHT: CAR PREVIEW */}
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rectangular" height={220} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
        </Box>
      </Box>
    </Box>
  );
}
