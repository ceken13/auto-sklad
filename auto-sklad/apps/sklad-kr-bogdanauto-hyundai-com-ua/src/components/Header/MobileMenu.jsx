import { Box, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, Typography } from '@mui/material';
import { BottomMenu } from './BottomMenu';
import { getStyles } from './styles';
import { theme } from '../../theme.ts';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function MobileMenu({ onClose }) {
  const styles = getStyles(theme);
  return (
    <Box sx={styles.mobTopMenuItem}>
      {/* STATIC LINKS */}
      <List>
        <ListItemButton sx={{ p: 2 }} component="a" href="https://kr-bogdanauto.hyundai.com.ua/contacts-kirovohrad">
          Контакти
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="http://sklad.hyundai-krp.com.ua/">
          Авто в наявності
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://kr-bogdanauto.hyundai.com.ua/zapys-servis-kirovohrad">
          Запис на сервіс
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://kr-bogdanauto.hyundai.com.ua/test-drive-kirovohrad">
          Тест-Драйв
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://kr-bogdanauto.hyundai.com.ua/video-review-kirovohrad">
          Відеоогляд
        </ListItemButton>
      </List>

      {/* ACCORDION: ПРО HYUNDAI */}
      <Accordion sx={styles.mobTopMenuItem}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.mobTopMenuItem}>Про Hyundai</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={styles.mobTopMenuItem}>Про бренд</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List>
                <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/istoriya-kompanii-hyundai">
                  Історія
                </ListItemButton>

                <ListItemButton
                  component="a"
                  href="https://kr-bogdanauto.hyundai.com.ua/misiya-ta-cinnosti-kompanii-hyundai"
                >
                  Місія та цінності
                </ListItemButton>

                <ListItemButton
                  component="a"
                  href="https://kr-bogdanauto.hyundai.com.ua/regular-and-special-information"
                >
                  Філософія бренду
                </ListItemButton>
                <Accordion sx={{ boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={styles.mobTopMenuItem}>Hyundai в Україні</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <List>
                      <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/hyundai-in-ukraine">
                        Про Hyundai Motor Україна
                      </ListItemButton>

                      <ListItemButton
                        component="a"
                        href="https://kr-bogdanauto.hyundai.com.ua/regular-and-special-information"
                      >
                        Регулярна інформація
                      </ListItemButton>
                    </List>
                  </AccordionDetails>
                </Accordion>
                <ListItemButton component="a" href="https://www.hyundai.com/worldwide/en">
                  Hyundai у світі
                </ListItemButton>
              </List>
            </AccordionDetails>
          </Accordion>

          <List>
            <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/news_kirovohrad">
              Новини
            </ListItemButton>
            <Accordion sx={{ boxShadow: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={styles.mobTopMenuItem}>Інновації</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <List>
                  <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/smart-tech">
                    Інтелектуальні технології
                  </ListItemButton>
                  <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/eco-technology">
                    ЕКО
                  </ListItemButton>
                  <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/performance">
                    Продуктивність
                  </ListItemButton>
                  <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/powertrain">
                    Трансмісія
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={styles.mobTopMenuItem}>WRC</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <List>
                  <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/wrc-2019-winners">
                    Переможець Чемпіонату світу з ралі-2019
                  </ListItemButton>
                  <ListItemButton component="a" href="https://kr-bogdanauto.hyundai.com.ua/wrc">
                    Hyundai у WRC
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
        </AccordionDetails>
      </Accordion>
      <BottomMenu />

      {/* OTHER ACCORDIONS */}
    </Box>
  );
}
