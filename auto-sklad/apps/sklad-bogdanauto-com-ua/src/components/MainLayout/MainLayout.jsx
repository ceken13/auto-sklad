import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Layout } from '../Layout/Layout';
import { Filters } from '../Filters/Filters';
import { SortingCarBlock } from '../SortingCarBlock/SortingCarBlock';
import Box from '@mui/material/Box';

export function MainLayout() {
  const styles = getStyles(theme);

  return (
    <Layout>
      <Typography variant="h1">ОНЛАЙН СКЛАД</Typography>
      <Box sx={styles.flexBetween}>
        <Filters />
        <Box sx={{ flexGrow: 1 }}>
          <SortingCarBlock />
        </Box>
      </Box>
    </Layout>
  );
}

export default MainLayout;
