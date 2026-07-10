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
        <ListItemButton sx={{ p: 2 }} component="a" href="https://hyundai-if.com.ua/contacts-if">
          Контакти
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://sklad.hyundai-if.com.ua/">
          Авто в наявності
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://hyundai-if.com.ua/zapys-servis-if">
          Запис на сервіс
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://hyundai-if.com.ua/test-drive-if">
          Тест-Драйв
        </ListItemButton>

        <ListItemButton sx={{ p: 2 }} component="a" href="https://hyundai-if.com.ua/video-review-if">
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
                <ListItemButton component="a" href="https://hyundai-if.com.ua/istoriya-kompanii-hyundai">
                  Історія
                </ListItemButton>

                <ListItemButton component="a" href="https://hyundai-if.com.ua/misiya-ta-cinnosti-kompanii-hyundai">
                  Місія та цінності
                </ListItemButton>

                <ListItemButton component="a" href="https://hyundai-if.com.ua/regular-and-special-information">
                  Філософія бренду
                </ListItemButton>
                <Accordion sx={{ boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={styles.mobTopMenuItem}>Hyundai в Україні</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <List>
                      <ListItemButton component="a" href="https://hyundai-if.com.ua/hyundai-in-ukraine">
                        Про Hyundai Motor Україна
                      </ListItemButton>

                      <ListItemButton component="a" href="https://hyundai-if.com.ua/regular-and-special-information">
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
            <ListItemButton component="a" href="https://hyundai-if.com.ua/news_if">
              Новини
            </ListItemButton>
            <Accordion sx={{ boxShadow: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={styles.mobTopMenuItem}>Інновації</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <List>
                  <ListItemButton component="a" href="https://hyundai-if.com.ua/smart-tech">
                    Інтелектуальні технології
                  </ListItemButton>
                  <ListItemButton component="a" href="https://hyundai-if.com.ua/eco-technology">
                    ЕКО
                  </ListItemButton>
                  <ListItemButton component="a" href="https://hyundai-if.com.ua/performance">
                    Продуктивність
                  </ListItemButton>
                  <ListItemButton component="a" href="https://hyundai-if.com.ua/powertrain">
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
                  <ListItemButton component="a" href="https://hyundai-if.com.ua/wrc-2019-winners">
                    Переможець Чемпіонату світу з ралі-2019
                  </ListItemButton>
                  <ListItemButton component="a" href="https://hyundai-if.com.ua/wrc">
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
