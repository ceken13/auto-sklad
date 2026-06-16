import { Typography, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout/Layout';
import { useEffect, useState } from 'react';
import { getCarByVin } from '../../api/cars.api';
import { getMediaUrl } from '../../utils/uploadImage';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ComparePageSkeleton } from '../../components/ui/ComparePageSkeleton';

export function ComparePage() {
  const { vinCodes } = useParams();
  const navigate = useNavigate();

  const vins = vinCodes ? vinCodes.split('-') : [];

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyDiff, setOnlyDiff] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await Promise.all(vins.map((vin) => getCarByVin(vin)));
        setCars(result);
      } finally {
        setLoading(false);
      }
    };

    if (vins.length) load();
  }, [vinCodes]);

  const removeCar = (vin) => {
    const newVins = vins.filter((v) => v !== vin);
    navigate(`/compare/${newVins.join('-')}`);
  };

  const compareSections = [
    {
      title: 'Основні характеристики',
      fields: [
        { label: 'Бренд', key: 'carBrand' },
        { label: 'Модель', key: 'model' },
        { label: 'Колір кузова', key: 'exteriorColor' },
        { label: 'Рік випуску', key: 'year' },
        { label: 'Комплектація', key: 'trimLevel' },
        { label: 'Двигун', key: 'engine' },
        { label: 'Тип палива', key: 'fuelType' },
        { label: 'КПП', key: 'transmission' },
        { label: 'Ціна', key: 'regularPrice' },
      ],
    },
    {
      title: 'Технічні характеристики',
      fields: [
        { label: 'Потужність (к.с.)', key: 'enginePowerHP' },
        { label: 'Розгін 0-100', key: 'accel0to100' },
        { label: 'Макс. швидкість', key: 'maximumSpeed' },
        { label: 'Міський цикл', key: 'cityFuelConsumption' },
        { label: 'Заміський цикл', key: 'highwayFuelConsumption' },
        { label: 'Комбінований цикл', key: 'combinedFuelConsumption' },
        { label: 'Паливний бак', key: 'fuelTankCapacity' },
        { label: 'Привід', key: 'driveType' },
      ],
    },
    {
      title: 'Габарити',
      fields: [
        { label: 'Довжина, мм', key: 'lengthMm' },
        { label: 'Ширина, мм', key: 'widthMm' },
        { label: 'Висота, мм', key: 'heightMm' },
        { label: 'Колісна база, мм', key: 'wheelbaseMm' },
        { label: 'Споряджена маса, кг', key: 'curbWeightKg' },
        { label: 'Повна маса, кг', key: 'grossWeightKg' },
      ],
    },
  ];

  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return 'Н/Д';
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();

      if (!trimmed) {
        return 'Н/Д';
      }

      return trimmed;
    }

    if (typeof value === 'boolean') {
      return value ? '+' : '-';
    }

    if (typeof value === 'number') {
      return value.toLocaleString('uk-UA');
    }

    return value;
  };
  const buildSpecsCompare = (cars) => {
    const sectionsMap = new Map();

    cars.forEach((car) => {
      car?.specs?.forEach((section) => {
        if (!sectionsMap.has(section.title)) {
          sectionsMap.set(section.title, new Map());
        }

        section.items.forEach((item) => {
          if (!sectionsMap.get(section.title).has(item.label)) {
            sectionsMap.get(section.title).set(item.label, {});
          }

          sectionsMap.get(section.title).get(item.label)[car.id] = item.value;
        });
      });
    });

    return Array.from(sectionsMap.entries()).map(([title, itemsMap]) => ({
      title,
      items: Array.from(itemsMap.entries()).map(([label, values]) => ({
        label,
        values,
      })),
    }));
  };
  const [openSections, setOpenSections] = useState({});

  if (loading) {
    return (
      <>
        <Header />
        <Layout>
          <ComparePageSkeleton />
        </Layout>
        <Footer />
      </>
    );
  }
  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const specsCompare = buildSpecsCompare(cars);

  const hasDifferences = (values) => {
    const normalized = values.map((v) => {
      if (v === null || v === undefined || v === '') {
        return '—';
      }

      if (typeof v === 'string') {
        return v.trim();
      }

      if (typeof v === 'boolean') {
        return v ? '+' : '-';
      }

      return String(v).trim();
    });

    return new Set(normalized).size > 1;
  };
  const visibleSpecsSections = specsCompare.filter((section) => {
    const visibleItems = section.items.filter((item) => {
      const values = cars.map((car) => item.values[car.id]);

      const hasValue = values.some((v) => v !== null && v !== undefined && String(v).trim() !== '');

      if (!hasValue) {
        return false;
      }

      return !onlyDiff || hasDifferences(values);
    });

    return visibleItems.length > 0;
  });

  if (cars.length < 2) {
    return (
      <>
        <Header />
        <Layout>
          <Typography>Мінімум 2 авто для порівняння</Typography>
        </Layout>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Layout>
        <Typography variant="h1">Онлайн склад Богдан-Авто Чернігів</Typography>
        <Typography onClick={() => navigate(-1)} sx={{ cursor: 'pointer', color: '#000', mb: 3 }}>
          Повернутись назад
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, fontFamily: 'HyundaiSansHeadRegular, sans-serif', textAlign: 'center' }}>
          Порівняння автомобілів
        </Typography>

        <Box
          sx={{
            mt: 4,
            width: {
              xs: 'auto', // мобільний — даємо скрол
              md: '100%', // десктоп — без скролу
            },
            overflowX: {
              xs: 'auto',
              md: 'visible',
            },
          }}
        >
          {/* ================= STICKY CARS HEADER ================= */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              background: '#fff',
              borderBottom: '1px solid #eee',
              py: 2,
              minWidth: 'max-content',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              {/* empty column for labels */}
              <Box
                sx={{
                  flex: {
                    xs: '0 0 200px',
                    md: '0 0 10%',
                    lg: '0 0 19%',
                  },
                  width: {
                    xs: '200px',
                    md: '10%',
                    lg: '19%',
                  },
                  alignSelf: 'self-end',
                }}
              >
                <FormControlLabel
                  control={<Checkbox checked={onlyDiff} onChange={(e) => setOnlyDiff(e.target.checked)} />}
                  label="Показати тільки відмінності"
                  sx={{ maxWidth: '210px', padding: '0', margin: '0' }}
                />
              </Box>

              {cars.map((car) => (
                <Box
                  key={car.id}
                  sx={{
                    border: '1px solid #ddd',
                    p: 2,
                    borderRadius: 2,
                    background: '#fff',
                    flex: {
                      xs: '0 0 200px',
                      md: '0 0 22%',
                      lg: '0 0 18%',
                    },
                    width: {
                      xs: '200px',
                      md: '22%',
                      lg: '18%',
                    },
                    maxWidth: '230px',
                  }}
                >
                  <Typography
                    fontWeight={700}
                    sx={{ textAlign: 'center', fontFamily: 'HyundaiSansHeadRegular, sans-serif' }}
                  >
                    {car.carBrand} {car.model}
                  </Typography>

                  <Box
                    component="img"
                    src={getMediaUrl(car?.imgCar) || '/images/car-placeholder.jpg'}
                    sx={{
                      width: '100%',
                      maxHeight: 100,
                      objectFit: 'contain',
                      mt: 1,
                    }}
                  />

                  <Button
                    size="small"
                    color="error"
                    sx={{ mt: 1, margin: '0 auto', width: '100%' }}
                    onClick={() => removeCar(car.vinCode)}
                  >
                    Видалити
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ================= TABLE ================= */}
          <Box sx={{ mt: 4, minWidth: 'max-content' }}>
            {compareSections
              .filter((section) => {
                const visibleFields = section.fields.filter((field) => {
                  const values = cars.map((car) => car[field.key]);

                  const hasValue = values.some((v) => v !== null && v !== undefined && String(v).trim() !== '');

                  if (!hasValue) {
                    return false;
                  }

                  if (!onlyDiff) {
                    return true;
                  }

                  return hasDifferences(values);
                });

                return visibleFields.length > 0;
              })
              .map((section) => (
                <Box key={section.title} sx={{ mb: 5 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 700, fontFamily: 'HyundaiSansHeadRegular, sans-serif' }}
                  >
                    {section.title}
                  </Typography>

                  {section.fields
                    .filter((field) => {
                      if (!onlyDiff) return true;

                      const values = cars.map((car) => car[field.key]);

                      return hasDifferences(values);
                    })
                    .map((field) => (
                      <Box
                        key={field.key}
                        sx={{
                          display: 'flex',
                          borderBottom: '1px solid #eee',
                          py: 1,
                        }}
                      >
                        {/* LABEL */}
                        <Box
                          sx={{
                            flex: {
                              xs: '0 0 200px',
                              md: '0 0 12%',
                              lg: '0 0 20%',
                            },
                            width: {
                              xs: '200px',
                              md: '12%',
                              lg: '20%',
                            },
                            fontWeight: 600,
                            fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                          }}
                        >
                          {field.label}
                        </Box>

                        {/* VALUES */}
                        {cars.map((car) => {
                          let value = car[field.key];

                          if (field.key === 'regularPrice') {
                            value = value ? `${value.toLocaleString('uk-UA')} грн` : 'Н/Д';
                          }
                          if (field.key === 'year') {
                            value = String(value);
                          }

                          return (
                            <Box
                              key={car.id}
                              sx={{
                                flex: {
                                  xs: '0 0 200px',
                                  md: '0 0 22%',
                                  lg: '0 0 20%',
                                },
                                width: {
                                  xs: '200px',
                                  md: '22%',
                                  lg: '20%',
                                },
                                textAlign: 'center',
                                fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                              }}
                            >
                              {formatValue(value)}
                            </Box>
                          );
                        })}
                      </Box>
                    ))}
                </Box>
              ))}
            {/* ================= OPTIONS (COMPARE STYLE) ================= */}
            {visibleSpecsSections.length > 0 && (
              <Box sx={{ mt: 6 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 700, fontFamily: 'HyundaiSansHeadRegular, sans-serif' }}
                >
                  Опції
                </Typography>

                {visibleSpecsSections.map((section) => {
                  const isOpen = openSections[section.title];
                  const visibleItems = section.items.filter((item) => {
                    if (!onlyDiff) return true;

                    const values = cars.map((car) => item.values[car.id]);

                    return hasDifferences(values);
                  });

                  if (!visibleItems.length) {
                    return null;
                  }
                  return (
                    <Box key={section.title} sx={{ mb: 2 }}>
                      {/* HEADER */}
                      <Box
                        onClick={() => toggleSection(section.title)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          p: 2,
                          border: isOpen ? '1px solid #f5f5f5' : '1px solid #E0E0E0',
                          backgroundColor: isOpen ? '#f5f5f5' : '#fff',
                          transition: 'background-color 0.2s ease',

                          '&:hover': {
                            backgroundColor: isOpen ? '#f5f5f5' : '#fafafa',
                            border: '1px solid #f5f5f5',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '18px',
                            fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                          }}
                        >
                          {section.title}
                        </Typography>

                        <Typography sx={{ fontSize: '20px' }}>
                          <ExpandMoreIcon
                            sx={{
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: '0.3s',
                            }}
                          />
                        </Typography>
                      </Box>

                      {/* CONTENT */}
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box>
                          {section.items
                            .filter((item) => {
                              if (!onlyDiff) return true;

                              const values = cars.map((car) => item.values[car.id]);

                              return hasDifferences(values);
                            })
                            .map((item) => (
                              <Box
                                key={item.label}
                                sx={{
                                  display: 'flex',
                                  px: 2,
                                  py: 1,
                                  borderBottom: '1px solid #f5f5f5',
                                }}
                              >
                                {/* LABEL */}
                                <Box
                                  sx={{
                                    flex: {
                                      xs: '0 0 200px',
                                      md: '0 0 12%',
                                      lg: '0 0 20%',
                                    },
                                    width: {
                                      xs: '200px',
                                      md: '12%',
                                      lg: '20%',
                                    },
                                    color: '#555',
                                    fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                                  }}
                                >
                                  {item.label}
                                </Box>

                                {/* VALUES PER CAR */}
                                {cars.map((car) => (
                                  <Box
                                    key={car.id}
                                    sx={{
                                      fontWeight: 500,
                                      flex: {
                                        xs: '0 0 200px',
                                        md: '0 0 22%',
                                        lg: '0 0 20%',
                                      },
                                      width: {
                                        xs: '200px',
                                        md: '22%',
                                        lg: '20%',
                                      },
                                      textAlign: 'center',
                                      fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                                    }}
                                  >
                                    {formatValue(item.values[car.id])}
                                  </Box>
                                ))}
                              </Box>
                            ))}
                        </Box>
                      </Collapse>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
      <Footer />
    </>
  );
}

export default ComparePage;
