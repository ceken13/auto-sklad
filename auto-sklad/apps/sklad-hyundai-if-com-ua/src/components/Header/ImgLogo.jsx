import { getStyles } from './styles';
import { theme } from '../../theme';
import { Box } from '@mui/material';

export function ImgLogo() {
  const styles = getStyles(theme);

  return (
    <Box sx={{ paddingLeft: '20px' }}>
      <div>
        <a href="https://hyundai-if.com.ua/" style={styles.logo} target="_blank">
          <img src="https://hyundai.com.ua/sites/all/themes/responsive/img/dealerLogoNew.png" style={styles.imgLogo} />
        </a>
      </div>
    </Box>
  );
}
