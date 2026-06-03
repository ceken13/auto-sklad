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
import { useEffect, useState } from 'react';
import { getFilters } from '../../api/filters.api';
import { getOrganizationSlug } from '../../utils/getOrganizationSlug';

export function Filters() {
  const [filterOptions, setFilterOptions] = useState(null);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const organizationSlug = getOrganizationSlug();

        const res = await getFilters(organizationSlug);

        console.log('FILTERS API:', res);

        setFilterOptions(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilters();
  }, []);

  const { filters, toggleFilter, clearFilters, setPrice, toggleBooleanFilter } = useFilters();

  const brands = filterOptions?.brands ?? [];
  const models = filterOptions?.models ?? [];
  const trimLevels = filterOptions?.trimLevels ?? [];
  const engines = filterOptions?.engines ?? [];
  const fuelTypes = filterOptions?.fuelTypes ?? [];
  const transmissions = filterOptions?.transmissions ?? [];
  const driveTypes = filterOptions?.driveTypes ?? [];
  const exteriorColors = filterOptions?.exteriorColors ?? [];
  const interiorColors = filterOptions?.interiorColors ?? [];
  const years = filterOptions?.years ?? [];
  const styles = getStyles(theme);

  return (
    <Box>
      <Box sx={styles.layoutFilters}>
        <Stack>
          {/* Марка */}
          {brands?.length > 0 && (
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
          )}
          {/* Модель */}
          {models?.length > 0 && (
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
          )}
          {/* Комплектація */}
          {trimLevels?.length > 0 && (
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
          )}
          {/* Двигун */}
          {engines?.length > 0 && (
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
          )}
          {/* Тип палива */}
          {fuelTypes?.length > 0 && (
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
          )}
          {/* Коробка передач */}
          {transmissions?.length > 0 && (
            <Accordion defaultExpanded sx={styles.accordionStyles}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Коробка передач</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Stack>
                  {transmissions.map((transmission) => (
                    <FormControlLabel
                      key={transmission}
                      control={
                        <Checkbox
                          checked={filters.transmissions.includes(transmission)}
                          onChange={() => toggleFilter('transmissions', transmission)}
                        />
                      }
                      label={transmission}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
          {/* Привід */}
          {driveTypes?.length > 0 && (
            <Accordion defaultExpanded sx={styles.accordionStyles}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Привід</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Stack>
                  {driveTypes.map((driveType) => (
                    <FormControlLabel
                      key={driveType}
                      control={
                        <Checkbox
                          checked={filters.driveTypes.includes(driveType)}
                          onChange={() => toggleFilter('driveTypes', driveType)}
                        />
                      }
                      label={driveType}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
          {/* Потужність батареї */}
          {/*<Accordion defaultExpanded sx={styles.accordionStyles}>
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
          </Accordion>*/}

          {/* Колір кузова */}
          <Accordion defaultExpanded sx={styles.accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Колір кузова</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack>
                {exteriorColors.map((exteriorColor) => (
                  <FormControlLabel
                    key={exteriorColor}
                    control={
                      <Checkbox
                        checked={filters.exteriorColors.includes(exteriorColor)}
                        onChange={() => toggleFilter('exteriorColors', exteriorColor)}
                      />
                    }
                    label={exteriorColor}
                  />
                ))}
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
                {interiorColors.map((interiorColor) => (
                  <FormControlLabel
                    key={interiorColor}
                    control={
                      <Checkbox
                        checked={filters.interiorColors.includes(interiorColor)}
                        onChange={() => toggleFilter('interiorColors', interiorColor)}
                      />
                    }
                    label={interiorColor}
                  />
                ))}
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
                {years.map((year) => (
                  <FormControlLabel
                    key={year}
                    control={
                      <Checkbox checked={filters.years.includes(year)} onChange={() => toggleFilter('years', year)} />
                    }
                    label={year}
                  />
                ))}
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
                max={5000000}
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
                <FormControlLabel
                  control={
                    <Checkbox checked={filters.availableCars} onChange={() => toggleBooleanFilter('availableCars')} />
                  }
                  label="В наявності"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={filters.inUkraineCars} onChange={() => toggleBooleanFilter('inUkraineCars')} />
                  }
                  label="В Україні"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          {/* Додаткові фільтри */}
          <Stack>
            <FormControlLabel
              sx={{ padding: '0px 20px 16px', borderBottom: '2px solid #fff', margin: 0 }}
              control={<Checkbox checked={filters.usedCars} onChange={() => toggleBooleanFilter('usedCars')} />}
              label="Вживані авто"
            />

            <FormControlLabel
              sx={{ padding: '16px 20px', borderBottom: '2px solid #fff', margin: 0 }}
              control={
                <Checkbox checked={filters.specialOfferCars} onChange={() => toggleBooleanFilter('specialOfferCars')} />
              }
              label="Спеціальна пропозиція"
            />

            <FormControlLabel
              sx={{ padding: '16px 20px', borderBottom: '2px solid #fff', margin: 0 }}
              control={
                <Checkbox checked={filters.pickUpOfferCars} onChange={() => toggleBooleanFilter('pickUpOfferCars')} />
              }
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
