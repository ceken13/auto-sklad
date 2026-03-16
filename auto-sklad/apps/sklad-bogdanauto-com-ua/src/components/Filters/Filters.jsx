import { theme } from '../../theme';
import { getStyles } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
  Slider,
  TextField,
} from '@mui/material';

export function Filters() {
  const styles = getStyles(theme);
  return (
    <Box>
      <Box sx={styles.layoutFilters}>
        <Stack spacing={1}>
          {/* Марка */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Марка</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="HYUNDAI" />
                <FormControlLabel control={<Checkbox />} label="JAC" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="HAVAL" />
                <FormControlLabel control={<Checkbox />} label="SUBARU" />
                <FormControlLabel control={<Checkbox />} label="GREAT WALL" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Модель */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Модель</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="M6" />
                <FormControlLabel control={<Checkbox />} label="ORA O3" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="H5" />
                <FormControlLabel control={<Checkbox />} label="H6" />
                <FormControlLabel control={<Checkbox />} label="H6 HEV" />
                <FormControlLabel control={<Checkbox />} label="H6 PHEV" />
                <FormControlLabel control={<Checkbox />} label="JOLION" />
                <FormControlLabel control={<Checkbox />} label="JOLION PRO" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Комплектація */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Комплектація</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="Standart" />
                <FormControlLabel control={<Checkbox />} label="Luxury" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Двигун */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Двигун</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="2.0 D" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Тип палива */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Тип палива</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="Бензин" />
                <FormControlLabel control={<Checkbox />} label="Дизель" />
                <FormControlLabel control={<Checkbox />} label="Електро" />
                <FormControlLabel control={<Checkbox />} label="Гібрид" />
              </Stack>
            </AccordionDetails>
          </Accordion>
          {/* Коробка передач */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Коробка передач</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="Автомат" />
                <FormControlLabel control={<Checkbox />} label="Механіка" />
                <FormControlLabel control={<Checkbox />} label="Робот" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Привід */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Привід</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="Передній" />
                <FormControlLabel control={<Checkbox />} label="Задній" />
                <FormControlLabel control={<Checkbox />} label="Повний" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Потужність батареї */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Потужність батареї</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="28 кВт/год" />
                <FormControlLabel control={<Checkbox />} label="39.2 кВт/год" />
                <FormControlLabel control={<Checkbox />} label="64 кВт/год" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Колір кузова */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Колір кузова</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="Black" />
                <FormControlLabel control={<Checkbox />} label="COC Gray" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Колір салону */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Колір салону</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="Black" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Рік випуску */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Рік випуску</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="2026" />
                <FormControlLabel control={<Checkbox />} label="2025" />
                <FormControlLabel control={<Checkbox />} label="2024" />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Ціна */}
          <Box>
            <Typography sx={{ mb: 2 }}>Ціна, грн</Typography>

            <Stack spacing={2}>
              <Slider value={[691600, 1500000]} min={0} max={2000000} />

              <Stack direction="row" spacing={2}>
                <TextField size="small" label="Від" defaultValue={691600} fullWidth />

                <TextField size="small" label="До" fullWidth />
              </Stack>
            </Stack>
          </Box>
          {/* Місце розташування */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Місце розташування</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                <FormControlLabel control={<Checkbox />} label="В наявності" />
                <FormControlLabel control={<Checkbox />} label="В Україні" />
              </Stack>
            </AccordionDetails>
          </Accordion>
          {/* Додаткові фільтри */}
          <Stack>
            <FormControlLabel control={<Checkbox />} label="Вживані авто" />

            <FormControlLabel control={<Checkbox />} label="Спеціальна пропозиція" />

            <FormControlLabel control={<Checkbox />} label="Забрати за 60 хвилин" />
          </Stack>
        </Stack>
      </Box>
      <Button variant="contained" color="primary">
        Очистити всі фільтри
      </Button>
    </Box>
  );
}

export default Filters;
