import { Drawer, IconButton, Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { getStyles } from './styles';
import { theme } from '../../theme.ts';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export function RightMenu({ open, toggleDrawer }) {
  const styles = getStyles(theme);
  const [openCompany, setOpenCompany] = useState(false);
  const [openService, setOpenService] = useState(false);

  return (
    <>
      {/* Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={styles.rightMenuLayout} role="presentation">
          {/* кнопка закриття */}
          <IconButton onClick={toggleDrawer(false)} sx={styles.closeIconRightMenu}>
            <CloseIcon />
          </IconButton>

          <List sx={{ p: '55px 5vw' }}>
            {/* Про компанію */}
            <ListItemButton variant="" onClick={() => setOpenCompany(!openCompany)}>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              >
                Про компанію
              </ListItemText>
              {openCompany ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openCompany} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component="a"
                  href="https://bogdanauto.com.ua/pro-kompaniyu/"
                  target="_blank"
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    primary="Про компанію"
                  />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  component="a"
                  href="https://bogdanauto.com.ua/vacancies/"
                  target="_blank"
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    primary="Вакансії"
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Автомобілі */}
            <ListItemButton component="a" href="https://bogdanauto.com.ua/models/" target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                primary="Автомобілі"
              />
            </ListItemButton>

            {/* Фінансові послуги */}
            <ListItemButton component="a" href="https://bogdanauto.com.ua/finansovi-poslugi/" target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                primary="Фінансові послуги"
              />
            </ListItemButton>

            {/* Сервіс */}
            <ListItemButton onClick={() => setOpenService(!openService)}>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                primary="Сервіс та СТО"
              />
              {openService ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openService} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component="a"
                  href="https://bogdanauto.com.ua/programa-loyalnosti/"
                  target="_blank"
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    primary="Програма лояльності"
                  />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  component="a"
                  href="https://bogdanauto.com.ua/poslugi-sto/"
                  target="_blank"
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    primary="Послуги СТО"
                  />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  component="a"
                  href="https://bogdanauto.com.ua/zobovyazannya-i-prava-storin/"
                  target="_blank"
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    primary="Зобов’язання і права сторін"
                  />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  component="a"
                  href="https://bogdanauto.com.ua/umovi-povernennya-koshtiv//"
                  target="_blank"
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    primary="Умови повернення коштів"
                  />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton component="a" href="https://bogdanauto.com.ua/category/promotions/" target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                primary="Акції"
              />
            </ListItemButton>

            <ListItemButton component="a" href="https://bogdanauto.com.ua/category/news/" target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                primary="Новини"
              />
            </ListItemButton>

            <ListItemButton component="a" href="https://bogdanauto.com.ua/kontakti/" target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                primary="Контакти"
              />
            </ListItemButton>
          </List>
        </Box>
        <Box sx={styles.bottomRightMenu}>
          <Box
            component="img"
            src="https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/icons/logo-white.svg"
            alt="Bogdan logo"
            sx={{ height: 30 }}
          />

          <Typography variant="body2" sx={{ color: '#fff', fontSize: '12px' }}>
            BOGDAN. All rights reserved.
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
