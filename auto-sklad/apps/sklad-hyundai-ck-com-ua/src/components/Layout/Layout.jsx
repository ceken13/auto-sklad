import Box from '@mui/material/Box';

export function Layout({ children }) {
  return (
    <Box
      sx={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: { xs: '8px', md: '0 20px', lg: '0 5px' },
      }}
    >
      {children}
    </Box>
  );
}
