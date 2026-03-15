import Box from '@mui/material/Box';

export function Layout({ children }) {
  return (
    <Box
      sx={{
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      {children}
    </Box>
  );
}
