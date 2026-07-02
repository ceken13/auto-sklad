import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMediaUrl } from '../../utils/uploadImage';

export default function ConfigurationEnrichmentForm({ onSubmit, initialData, onClose }) {
  const SPEC_SECTIONS = ['Безпека', 'Комфорт і обладнання', 'Мультимедіа', 'Світло', "Інтер'єр", "Екстер'єр"];
  const isEditMode = Boolean(initialData);

  const normalizeImages = (arr) => (arr || []).map((img) => getMediaUrl(img));

  const emptySpec = {
    title: '',
    items: [],
  };
  useEffect(() => {
    if (!initialData) return;

    setForm({
      carBrand: initialData.carBrand ?? '',
      model: initialData.model ?? '',
      configuration: initialData.configuration ?? '',
      specialPrice: initialData.specialPrice ?? '',

      brandId: initialData.brandId ?? '',
      modelId: initialData.modelId ?? '',
      configurationId: initialData.configurationId ?? '',

      sliderImages: initialData.sliderImages ?? [],
      imgCar: initialData.imgCar ?? '',

      engine: initialData.engine ?? '',
      enginePowerHP: initialData.enginePowerHP ?? '',

      trimLevel: initialData.trimLevel ?? '',
      fuelType: initialData.fuelType ?? '',

      accel0to100: initialData.accel0to100 ?? '',
      maximumSpeed: initialData.maximumSpeed ?? '',

      transmission: initialData.transmission ?? '',
      driveType: initialData.driveType ?? '',

      cityFuelConsumption: initialData.cityFuelConsumption ?? '',
      highwayFuelConsumption: initialData.highwayFuelConsumption ?? '',
      combinedFuelConsumption: initialData.combinedFuelConsumption ?? '',

      fuelTankCapacity: initialData.fuelTankCapacity ?? '',
      coEmissions: initialData.coEmissions ?? '',

      lengthMm: initialData.lengthMm ?? '',
      widthMm: initialData.widthMm ?? '',
      heightMm: initialData.heightMm ?? '',
      wheelbaseMm: initialData.wheelbaseMm ?? '',

      curbWeightKg: initialData.curbWeightKg ?? '',
      grossWeightKg: initialData.grossWeightKg ?? '',

      specs: initialData.specs?.length ? initialData.specs : [{ title: '', items: [] }],
    });
  }, [initialData]);

  const [form, setForm] = useState({
    carBrand: '',
    model: '',
    configuration: '',

    brandId: '',
    modelId: '',
    configurationId: '',
    specialPrice: '',
    imgCar: '',
    sliderImages: [], // через кому

    engine: '',
    enginePowerHP: '',

    trimLevel: '',
    fuelType: '',

    accel0to100: '',
    maximumSpeed: '',

    transmission: '',
    driveType: '',

    combinedFuelConsumption: '',

    fuelTankCapacity: '',
    coEmissions: '',

    lengthMm: '',
    widthMm: '',
    heightMm: '',
    wheelbaseMm: '',

    curbWeightKg: '',
    grossWeightKg: '',

    specs: [emptySpec],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- FILE UPLOAD ----------------

  const isValidImageFile = (file) =>
    ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) && file.size <= 500 * 1024;

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert('Файл має бути PNG/JPG і ≤500KB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        imgCar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSliderUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (!isValidImageFile(file)) {
        alert(`Файл ${file.name} не підходить`);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          sliderImages: [...prev.sliderImages, reader.result],
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  const removeSliderImage = (img) => {
    setForm((prev) => ({
      ...prev,
      sliderImages: prev.sliderImages.filter((x) => x !== img),
    }));
  };
  const removeMainImage = () => {
    setForm((prev) => ({
      ...prev,
      imgCar: '',
    }));
  };

  // ---------------- SPECS ----------------

  const addSpecSection = () => {
    setForm((prev) => ({
      ...prev,
      specs: [...prev.specs, { title: '', items: [] }],
    }));
  };

  const removeSpecSection = (index) => {
    setForm((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const updateSpecTitle = (index, value) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[index].title = value;
      return { ...prev, specs };
    });
  };

  const addSpecItem = (specIndex) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[specIndex].items.push({ label: '', value: false });
      return { ...prev, specs };
    });
  };

  const updateSpecItem = (si, ii, key, value) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[si].items[ii][key] = value;
      return { ...prev, specs };
    });
  };

  const removeSpecItem = (si, ii) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[si].items = specs[si].items.filter((_, i) => i !== ii);
      return { ...prev, specs };
    });
  };

  // ---------------- SUBMIT ----------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedSpecs = form.specs
      .filter((s) => s.title && s.title.trim() !== '')
      .map((s) => ({
        title: s.title,
        items: (s.items || [])
          .filter((i) => i.label && i.label.trim() !== '')
          .map((i) => ({
            label: i.label,
            value: Boolean(i.value),
          })),
      }))
      .filter((s) => s.items.length > 0);
    if (!form.carBrand.trim() || !form.model.trim() || !form.configuration.trim() || !form.configurationId.trim()) {
      alert('Заповни обовʼязкові поля: Марка, Модель, Конфігурація, ID конфігурації');
      return;
    }

    const payload = {
      carBrand: form.carBrand || null,
      model: form.model || null,
      configuration: form.configuration || null,
      specialPrice: form.specialPrice ? Number(form.specialPrice) : null,

      brandId: form.brandId || null,
      modelId: form.modelId || null,
      configurationId: form.configurationId || null,

      imgCar: form.imgCar || null,
      sliderImages: form.sliderImages || [],

      engine: form.engine || null,
      enginePowerHP: form.enginePowerHP ? Number(form.enginePowerHP) : null,

      trimLevel: form.trimLevel || null,
      fuelType: form.fuelType || null,

      accel0to100: form.accel0to100 || null,
      maximumSpeed: form.maximumSpeed || null,

      transmission: form.transmission || null,
      driveType: form.driveType || null,

      combinedFuelConsumption: form.combinedFuelConsumption || null,

      fuelTankCapacity: form.fuelTankCapacity || null,
      coEmissions: form.coEmissions || null,

      lengthMm: form.lengthMm || null,
      widthMm: form.widthMm || null,
      heightMm: form.heightMm || null,
      wheelbaseMm: form.wheelbaseMm || null,

      curbWeightKg: form.curbWeightKg || null,
      grossWeightKg: form.grossWeightKg || null,

      specs: cleanedSpecs,
    };

    onSubmit(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h5">Створення комплектації (enrichment)</Typography>

        {/* БАЗА */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField name="carBrand" label="Марка" required value={form.carBrand} onChange={handleChange} fullWidth />
          <TextField name="model" label="Модель" required value={form.model} onChange={handleChange} fullWidth />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="configuration"
            label="Конфігурація"
            required
            value={form.configuration}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="configurationId"
            label="ID конфігурації"
            required
            value={form.configurationId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="specialPrice"
            label="Акційна ціна"
            value={form.specialPrice}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        {/* ID */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField name="brandId" label="Brand ID" value={form.brandId} onChange={handleChange} fullWidth />
          <TextField name="modelId" label="Model ID" value={form.modelId} onChange={handleChange} fullWidth />
        </Box>

        {/* ---------------- ФОТО (URL + UPLOAD) ---------------- */}

        <TextField name="imgCar" label="Головне фото (URL)" value={form.imgCar} onChange={handleChange} fullWidth />

        <Button variant="outlined" component="label">
          Завантажити головне фото
          <input hidden type="file" accept="image/*" onChange={handleMainImageUpload} />
        </Button>

        {form.imgCar && (
          <Box sx={{ position: 'relative', width: 120 }}>
            <img src={getMediaUrl(form.imgCar)} alt="main" width={120} />

            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'white' }}
              onClick={removeMainImage}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Button variant="outlined" component="label">
          Завантажити слайдер фото
          <input hidden type="file" multiple accept="image/*" onChange={handleSliderUpload} />
        </Button>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {form.sliderImages.map((img, i) => (
            <Box key={i} sx={{ position: 'relative' }}>
              <img src={getMediaUrl(img)} width={100} alt="" />

              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'white' }}
                onClick={() => removeSliderImage(img)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* ДВИГУН */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField name="engine" label="Двигун" value={form.engine} onChange={handleChange} fullWidth />
          <TextField
            name="enginePowerHP"
            label="Потужність (к.с.)"
            value={form.enginePowerHP}
            onChange={handleChange}
            fullWidth
          />
          <TextField name="trimLevel" label="Комплектація" value={form.trimLevel} onChange={handleChange} fullWidth />
        </Box>

        {/* SELECTS */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField select name="fuelType" value={form.fuelType} label="Тип палива" onChange={handleChange} fullWidth>
            <MenuItem value="Бензин">Бензин</MenuItem>
            <MenuItem value="Дизель">Дизель</MenuItem>
            <MenuItem value="Гібрид">Гібрид</MenuItem>
            <MenuItem value="Електро">Електро</MenuItem>
          </TextField>

          <TextField
            select
            name="transmission"
            value={form.transmission}
            label="Коробка"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Автомат">Автомат</MenuItem>
            <MenuItem value="Механіка">Механіка</MenuItem>
            <MenuItem value="Робот">Робот</MenuItem>
            <MenuItem value="Варіатор">Варіатор</MenuItem>
          </TextField>

          <TextField select name="driveType" value={form.driveType} label="Привід" onChange={handleChange} fullWidth>
            <MenuItem value="Передній">Передній</MenuItem>
            <MenuItem value="Задній">Задній</MenuItem>
            <MenuItem value="Повний">Повний</MenuItem>
          </TextField>
        </Box>

        {/* РОЗМІРИ  */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="lengthMm"
            value={form.lengthMm}
            label="Габарити авто Довжина, мм"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="widthMm"
            value={form.widthMm}
            label="Габарити авто Ширина, мм"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="heightMm"
            value={form.heightMm}
            label="Габарити авто Висота, мм"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="wheelbaseMm"
            value={form.wheelbaseMm}
            label="Колісна база, мм"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* ПАЛИВО  */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="combinedFuelConsumption"
            value={form.combinedFuelConsumption}
            label="Витрати палива 
            (комбінований)"
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="fuelTankCapacity"
            value={form.fuelTankCapacity}
            label="Паливний бак (л)"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            fullWidth
            label="Викиди CO2, г/км"
            name="coEmissions"
            value={form.coEmissions}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="accel0to100"
            value={form.accel0to100}
            label="Розгін від 0 до 100 км/год, с:"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="maximumSpeed"
            value={form.maximumSpeed}
            label="Максимальна швидкість, км/год"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="curbWeightKg"
            value={form.curbWeightKg}
            label="Споряджена маса, кг"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="grossWeightKg"
            value={form.grossWeightKg}
            label="Повна маса, кг"
            onChange={handleChange}
            fullWidth
          />
        </Box>
        {/* SPECS ) */}
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Опції ({form.specs.length})</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {form.specs.map((spec, si) => (
              <Box key={si} sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
                <TextField
                  select
                  label="Назва секції"
                  value={spec.title}
                  onChange={(e) => updateSpecTitle(si, e.target.value)}
                  fullWidth
                  sx={{
                    mt: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f5f5f5',
                      '& fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontWeight: 700,
                    },
                  }}
                >
                  <MenuItem value="">Виберіть категорію</MenuItem>

                  {SPEC_SECTIONS.map((section) => (
                    <MenuItem key={section} value={section}>
                      {section}
                    </MenuItem>
                  ))}
                </TextField>

                {spec.items.map((item, ii) => (
                  <Box key={ii} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <TextField
                      value={item.label}
                      onChange={(e) => updateSpecItem(si, ii, 'label', e.target.value)}
                      fullWidth
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.value}
                          onChange={(e) => updateSpecItem(si, ii, 'value', e.target.checked)}
                        />
                      }
                      label="є"
                    />

                    <Button color="error" onClick={() => removeSpecItem(si, ii)}>
                      X
                    </Button>
                  </Box>
                ))}

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button onClick={() => addSpecItem(si)}>Додати опцію</Button>

                  <Button color="error" onClick={() => removeSpecSection(si)}>
                    Видалити секцію
                  </Button>
                </Box>
              </Box>
            ))}

            <Button variant="outlined" onClick={addSpecSection}>
              Додати категорію
            </Button>
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Button type="submit" variant="contained">
            {isEditMode ? 'Оновити' : 'Створити'}
          </Button>

          {isEditMode && (
            <Button variant="outlined" color="error" onClick={onClose}>
              Закрити
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
