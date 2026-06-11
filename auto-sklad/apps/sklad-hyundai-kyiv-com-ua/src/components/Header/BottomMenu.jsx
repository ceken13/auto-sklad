import { List, ListItemButton, ListItemText } from '@mui/material';
import { getStyles } from './styles';
import { theme } from '../../theme.ts';

export function BottomMenu() {
  const styles = getStyles(theme);

  return (
    <List sx={styles.bottomMenuLayout}>
      {/* Моделі */}
      <ListItemButton
        sx={styles.bottomMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/all-models"
        target="_blank"
      >
        <ListItemText
          primaryTypographyProps={{
            fontSize: '14px',
            fontFamily: 'HyundaiSansHeadMedium, sans-serif',
          }}
          primary="Моделі"
        />
      </ListItemButton>

      {/* Сервіс та Акції */}
      <ListItemButton
        sx={styles.bottomMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/service-bogdanauto"
        target="_blank"
      >
        <ListItemText
          primaryTypographyProps={{
            fontSize: '14px',
            fontFamily: 'HyundaiSansHeadMedium, sans-serif',
          }}
          primary="Сервіс та Акції"
        />
      </ListItemButton>

      <ListItemButton
        sx={styles.bottomMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/specialoffers-bogdanauto"
        target="_blank"
      >
        <ListItemText
          primaryTypographyProps={{
            fontSize: '14px',
            fontFamily: 'HyundaiSansHeadMedium, sans-serif',
          }}
          primary="Спецпропозиції"
        />
      </ListItemButton>

      <ListItemButton
        sx={styles.bottomMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/hyundai-finance"
        target="_blank"
      >
        <ListItemText
          primaryTypographyProps={{
            fontSize: '14px',
            fontFamily: 'HyundaiSansHeadMedium, sans-serif',
          }}
          primary="Hyundai Finance"
        />
      </ListItemButton>

      <ListItemButton
        sx={styles.bottomMenuItem}
        component="a"
        href="https://hyundai-kyiv.com.ua/corporative-sales-bogdan-avto"
        target="_blank"
      >
        <ListItemText
          primaryTypographyProps={{
            fontSize: '14px',
            fontFamily: 'HyundaiSansHeadMedium, sans-serif',
          }}
          primary="Корпоративні продажі"
        />
      </ListItemButton>
    </List>
  );
}
