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
import { useFilters } from '../../context/FilterContext';

export function Filters() {
  const { filters, toggleFilter, clearFilters, setPrice, toggleUsedCars } = useFilters();
  const brands = ['HYUNDAI', 'JAC', 'HAVAL', 'SUBARU', 'GREAT WALL'];
  const models = ['M6', 'ORA O3', 'H5', 'H6', 'H6 HEV'];
  const trimLevels = ['Standart', 'Luxury'];
  const engines = ['2.0 D', '2.0 T', '1.5 T'];
  const fuelTypes = ['Бензин', 'Дизель', 'Електро', 'Гібрид'];
  const styles = getStyles(theme);

  return (
    <Box>
      <Box sx={styles.layoutFilters}>
        <Stack>
          {/* Марка */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Марка</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleFilter('brands', brand)}
                      />
                    }
                    label={brand}
                  />
                ))}
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
                {models.map((model) => (
                  <FormControlLabel
                    key={model}
                    control={
                      <Checkbox
                        checked={filters.models.includes(model)}
                        onChange={() => toggleFilter('models', model)}
                      />
                    }
                    label={model}
                  />
                ))}
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
                {trimLevels.map((trimLevel) => (
                  <FormControlLabel
                    key={trimLevel}
                    control={
                      <Checkbox
                        checked={filters.trimLevels.includes(trimLevel)}
                        onChange={() => toggleFilter('trimLevels', trimLevel)}
                      />
                    }
                    label={trimLevel}
                  />
                ))}
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
                {engines.map((engine) => (
                  <FormControlLabel
                    key={engine}
                    control={
                      <Checkbox
                        checked={filters.engines.includes(engine)}
                        onChange={() => toggleFilter('engines', engine)}
                      />
                    }
                    label={engine}
                  />
                ))}
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
                {fuelTypes.map((fuelType) => (
                  <FormControlLabel
                    key={fuelType}
                    control={
                      <Checkbox
                        checked={filters.fuelTypes.includes(fuelType)}
                        onChange={() => toggleFilter('fuelTypes', fuelType)}
                      />
                    }
                    label={fuelType}
                  />
                ))}
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
          <Box sx={{ padding: '16px 20px' }}>
            <Typography sx={{ mb: 2 }}>Ціна, грн</Typography>

            <Stack spacing={2}>
              <Slider
                value={filters.regularPrice}
                onChange={(e, newValue) => setPrice(newValue)}
                min={0}
                max={3000000}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  label="Від"
                  type="number"
                  value={filters.regularPrice[0]}
                  onChange={(e) => setPrice([Number(e.target.value), filters.regularPrice[1]])}
                  fullWidth
                />

                <TextField
                  size="small"
                  label="До"
                  type="number"
                  value={filters.regularPrice[1]}
                  onChange={(e) => setPrice([filters.regularPrice[0], Number(e.target.value)])}
                  fullWidth
                />
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
            <FormControlLabel
              sx={{ padding: '0px 20px 16px', borderBottom: '2px solid #fff', margin: 0 }}
              control={
                <Checkbox
                  checked={filters.usedCars}
                  onChange={toggleUsedCars} // викликаємо окрему функцію
                />
              }
              label="Вживані авто"
            />

            <FormControlLabel
              sx={{ padding: '16px 20px', borderBottom: '2px solid #fff', margin: 0 }}
              control={<Checkbox />}
              label="Спеціальна пропозиція"
            />

            <FormControlLabel
              sx={{ padding: '16px 20px', borderBottom: '2px solid #fff', margin: 0 }}
              control={<Checkbox />}
              label="Забрати за 60 хвилин"
            />
          </Stack>
        </Stack>
      </Box>
      <Button onClick={clearFilters} variant="contained" color="primary">
        Очистити всі фільтри
      </Button>
    </Box>
  );
}

export default Filters;
