import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Layout } from '../Layout/Layout';
import { Filters } from '../Filters/Filters';
import { SortingCarBlock } from '../SortingCarBlock/SortingCarBlock';
import { Box, Button, Drawer, useMediaQuery } from '@mui/material';
import { useState } from 'react';

export function MainLayoutHomePage() {
  const styles = getStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // мобільні < 600px
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Layout>
      <Typography variant="h1">ОНЛАЙН СКЛАД</Typography>
      <Box sx={styles.flexBetween}>
        {isMobile ? (
          <>
            <Button variant="contained" onClick={toggleDrawer(true)}>
              Фільтр
            </Button>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250, p: 2 }}>
                <Filters />
              </Box>
            </Drawer>
          </>
        ) : (
          <Filters />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <SortingCarBlock />
        </Box>
      </Box>
    </Layout>
  );
}

export default MainLayoutHomePage;
