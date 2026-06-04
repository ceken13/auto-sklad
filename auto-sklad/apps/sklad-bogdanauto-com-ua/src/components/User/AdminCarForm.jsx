import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sortable from 'sortablejs';
import { useConfigurationEnrichments } from '../../hooks/useConfigurationEnrichments';
import { getOrganizationSlug } from '../../utils/getOrganizationSlug';
import { getMediaUrl } from '../../utils/uploadImage';

export default function AdminCarForm({ onSubmit, editingCar, onClose, user, organizations }) {
  const MAX_FILE_SIZE = 500 * 1024;
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const normalizeImages = (arr) => (arr || []).map((img) => getMediaUrl(img));
  const isValidImageFile = (file) => validTypes.includes(file.type) && file.size <= MAX_FILE_SIZE;

  const emptySpec = { title: '', items: [] };

  const [form, setForm] = useState({
    vinCode: '',
    carBrand: '',
    model: '',
    imgCar: '',
    sliderImages: [],
    store: '',
    storeId: '',
    dealerName: '',
    dealerCity: '',
    engine: '',
    enginePowerHP: '',
    year: '',
    interiorColor: '',
    exteriorColor: '',
    regularPrice: '',
    loanRepayment: '',
    specialOffer: false,
    pickUpOffer: false,
    usedCars: true,
    inUkraine: true,
    availableCar: true,
    trimLevel: '',
    fuelType: '',
    accel0to100: '',
    maximumSpeed: '',
    transmission: '',
    cityFuelConsumption: '',
    highwayFuelConsumption: '',
    combinedFuelConsumption: '',
    fuelTankCapacity: '',
    driveType: '',
    lengthMm: '',
    widthMm: '',
    heightMm: '',
    wheelbaseMm: '',
    curbWeightKg: '',
    grossWeightKg: '',
    organizationSlug: '',
    specs: [emptySpec],
  });

  const sortableRef = useRef(null);
  const sortableInstance = useRef(null);

  useEffect(() => {
    if (editingCar) {
      setForm((prev) => ({
        ...prev,
        ...editingCar,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        organizationSlug: user?.organizationSlug || '',
      }));
    }
  }, [editingCar, user]);

  useEffect(() => {
    if (sortableRef.current && !sortableInstance.current) {
      sortableInstance.current = Sortable.create(sortableRef.current, {
        animation: 150,
        onEnd: (evt) => {
          setForm((prev) => {
            const newOrder = [...prev.sliderImages];
            const [moved] = newOrder.splice(evt.oldIndex, 1);
            newOrder.splice(evt.newIndex, 0, moved);
            return { ...prev, sliderImages: newOrder };
          });
        },
      });
    }
    return () => {
      if (sortableInstance.current) {
        sortableInstance.current.destroy();
        sortableInstance.current = null;
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let finalValue = type === 'checkbox' ? checked : value;

    // поля які мають бути CAPSLOCK
    if (['carBrand', 'vinCode'].includes(name)) {
      finalValue = value.toUpperCase();
    }

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!isValidImageFile(file)) return alert('Файл повинен бути PNG або JPG і ≤500KB');
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, imgCar: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSliderImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (!isValidImageFile(file)) return alert(`Файл ${file.name} не підходить`);
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, sliderImages: [...prev.sliderImages, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSliderImage = (img) => {
    setForm((prev) => ({ ...prev, sliderImages: prev.sliderImages.filter((i) => i !== img) }));
  };
  const removeMainImage = () => {
    setForm((prev) => ({
      ...prev,
      imgCar: '',
    }));
  };

  // -------------------- DYNAMIC SPECS HANDLERS --------------------
  const addSpecSection = () => setForm((prev) => ({ ...prev, specs: [...prev.specs, { title: '', items: [] }] }));
  const removeSpecSection = (index) => {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== index) }));
  };
  const updateSpecTitle = (index, title) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[index].title = title;
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
  const removeSpecItem = (specIndex, itemIndex) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[specIndex].items = specs[specIndex].items.filter((_, i) => i !== itemIndex);
      return { ...prev, specs };
    });
  };
  const updateSpecItem = (specIndex, itemIndex, key, value) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[specIndex].items[itemIndex][key] = value;
      return { ...prev, specs };
    });
  };

  // -----------------------------------------------------------------
  const toNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const { enrichments } = useConfigurationEnrichments();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      vinCode: form.vinCode?.trim(),
      store: form.store || 'Default Store',
      storeId: form.storeId || '0000000001',
      carBrand: form.carBrand,
      model: form.model,

      imgCar: form.imgCar,
      sliderImages: form.sliderImages || [],

      dealerName: form.dealerName,
      dealerCity: form.dealerCity,

      engine: form.engine,
      enginePowerHP: toNumber(form.enginePowerHP),

      year: toNumber(form.year),

      interiorColor: form.interiorColor,
      exteriorColor: form.exteriorColor,

      regularPrice: toNumber(form.regularPrice),
      loanRepayment: toNumber(form.loanRepayment),

      trimLevel: form.trimLevel,

      fuelType: form.fuelType,
      transmission: form.transmission,
      driveType: form.driveType,

      accel0to100: form.accel0to100,
      maximumSpeed: form.maximumSpeed,

      cityFuelConsumption: form.cityFuelConsumption,
      highwayFuelConsumption: form.highwayFuelConsumption,
      combinedFuelConsumption: form.combinedFuelConsumption,

      fuelTankCapacity: form.fuelTankCapacity,

      lengthMm: form.lengthMm,
      widthMm: form.widthMm,
      heightMm: form.heightMm,
      wheelbaseMm: form.wheelbaseMm,

      curbWeightKg: form.curbWeightKg,
      grossWeightKg: form.grossWeightKg,
      organizationSlug: form.organizationSlug,

      specialOffer: !!form.specialOffer,
      pickUpOffer: !!form.pickUpOffer,
      usedCars: !!form.usedCars,

      inUkraine: !!form.inUkraine,
      availableCar: !!form.availableCar,

      specs: form.specs
        .filter((s) => s.title?.trim() && s.items?.length > 0)
        .map((s) => ({
          title: s.title.trim(),
          items: s.items
            .filter((i) => i.label?.trim())
            .map((i) => ({
              label: i.label.trim(),
              value: !!i.value,
            })),
        })),
    };
    console.log('FINAL PAYLOAD:', payload);
    console.log('VIN:', payload.vinCode);
    console.log('enginePowerHP:', payload.enginePowerHP);
    console.log('year:', payload.year);
    console.log('sliderImages:', payload.sliderImages);
    onSubmit(payload);
  };
  const isSuperAdmin = user?.role === 'superadmin';
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" mb={2}>
        {editingCar ? 'Редагувати авто' : 'Додати авто'}
      </Typography>

      <Stack spacing={2}>
        {/* Основні поля */}

        {/*<TextField
          select
          label="Комплектація (з шаблону)"
          fullWidth
          onChange={(e) => {
            const selected = enrichments.find((x) => x.configurationId === e.target.value);

            if (selected) {
              setForm((prev) => ({
                ...prev,
                carBrand: selected.carBrand || '',
                model: selected.model || '',
                engine: selected.engine || '',
                enginePowerHP: selected.enginePowerHP || '',
                fuelType: selected.fuelType || '',
                transmission: selected.transmission || '',
                driveType: selected.driveType || '',
                accel0to100: selected.accel0to100 || '',
                maximumSpeed: selected.maximumSpeed || '',
                cityFuelConsumption: selected.cityFuelConsumption || '',
                highwayFuelConsumption: selected.highwayFuelConsumption || '',
                combinedFuelConsumption: selected.combinedFuelConsumption || '',
                fuelTankCapacity: selected.fuelTankCapacity || '',
                lengthMm: selected.lengthMm || '',
                widthMm: selected.widthMm || '',
                heightMm: selected.heightMm || '',
                wheelbaseMm: selected.wheelbaseMm || '',
                specs: selected.specs || [],
              }));
            }
          }}
        >
          {enrichments.map((item) => (
            <MenuItem key={item.id} value={item.configurationId}>
              {item.carBrand} — {item.model} — {item.configuration}
            </MenuItem>
          ))}
        </TextField>*/}

        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Марка" required name="carBrand" value={form.carBrand} onChange={handleChange} />
          <TextField label="Модель" required name="model" value={form.model} onChange={handleChange} />
          <TextField label="VIN код" required name="vinCode" value={form.vinCode} onChange={handleChange} />
        </Box>

        {isSuperAdmin && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="org-select-label">Організація (organizationSlug)</InputLabel>

            <Select
              labelId="org-select-label"
              name="organizationSlug"
              value={form.organizationSlug || ''}
              label="Організація (organizationSlug)"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  organizationSlug: e.target.value,
                }))
              }
            >
              {organizations?.map((org) => (
                <MenuItem key={org.slug} value={org.slug}>
                  {org.name} ({org.slug})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button variant="outlined" component="label">
          Головне зображення
          <input type="file" hidden accept="image/png,image/jpeg" onChange={handleMainImage} />
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
          Зображення для слайдера
          <input type="file" hidden accept="image/png,image/jpeg" multiple onChange={handleSliderImages} />
        </Button>
        <Stack direction="row" spacing={1} ref={sortableRef} sx={{ flexWrap: 'wrap', cursor: 'grab' }}>
          {form.sliderImages.map((img) => (
            <Box key={img} sx={{ position: 'relative' }}>
              <img src={getMediaUrl(img)} width={100} height={60} alt="" style={{ userSelect: 'none' }} />
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'white' }}
                onClick={() => removeSliderImage(img)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Назва дилера" name="dealerName" value={form.dealerName} onChange={handleChange} />
          <TextField label="Місто" name="dealerCity" value={form.dealerCity} onChange={handleChange} />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Комплектація" name="trimLevel" value={form.trimLevel} onChange={handleChange} />
          <TextField label="Рік випуску " name="year" value={form.year} onChange={handleChange} />
          <TextField label="Колір салону" name="interiorColor" value={form.interiorColor} onChange={handleChange} />
          <TextField label="Колір кузова" name="exteriorColor" value={form.exteriorColor} onChange={handleChange} />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Регулярна ціна" name="regularPrice" value={form.regularPrice} onChange={handleChange} />
          <TextField label="Кредитний платіж" name="loanRepayment" value={form.loanRepayment} onChange={handleChange} />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <FormControlLabel
            control={<Checkbox name="specialOffer" checked={form.specialOffer} onChange={handleChange} />}
            label="СПЕЦІАЛЬНА ПРОПОЗИЦІЯ"
          />
          <FormControlLabel
            control={<Checkbox name="pickUpOffer" checked={form.pickUpOffer} onChange={handleChange} />}
            label="ЗАБРАТИ ЗА 60 ХВИЛИН"
          />
          <FormControlLabel
            control={<Checkbox name="usedCars" checked={form.usedCars} onChange={handleChange} />}
            label="Вживане авто"
          />
          <FormControlLabel
            control={<Checkbox name="inUkraine" checked={form.inUkraine} onChange={handleChange} />}
            label="В Україні"
          />
          <FormControlLabel
            control={<Checkbox name="availableCar" checked={form.availableCar} onChange={handleChange} />}
            label="В наявності"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Двигун" name="engine" value={form.engine} onChange={handleChange} />
          <TextField
            label="Потужність (к.с./об.хв.)"
            name="enginePowerHP"
            value={form.enginePowerHP || ''}
            onChange={handleChange}
          />

          <TextField
            label="Розгін від 0 до 100 км/год"
            name="accel0to100"
            value={form.accel0to100}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField
            label="Максимальна швидкість, км/год"
            name="maximumSpeed"
            value={form.maximumSpeed}
            onChange={handleChange}
          />

          <TextField
            label="Паливний бак, л"
            name="fuelTankCapacity"
            value={form.fuelTankCapacity}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField
            label="Витрати пального Міський цикл"
            name="cityFuelConsumption"
            value={form.cityFuelConsumption}
            onChange={handleChange}
          />
          <TextField
            label="Витрати пального Заміський цикл"
            name="highwayFuelConsumption"
            value={form.highwayFuelConsumption}
            onChange={handleChange}
          />
          <TextField
            label="Витрати пального Комбінований цикл"
            name="combinedFuelConsumption"
            value={form.combinedFuelConsumption}
            onChange={handleChange}
          />
        </Box>
        {/* SELECTS: Тип палива, Коробка передач, Привід */}
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField select label="Тип палива" name="fuelType" value={form.fuelType} onChange={handleChange}>
            <MenuItem value="">Виберіть</MenuItem>
            <MenuItem value="Бензин">Бензин</MenuItem>
            <MenuItem value="Дизель">Дизель</MenuItem>
            <MenuItem value="Електро">Електро</MenuItem>
            <MenuItem value="Гібрид">Гібрид</MenuItem>
          </TextField>

          <TextField
            select
            label="Коробка передач"
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
          >
            <MenuItem value="">Виберіть</MenuItem>
            <MenuItem value="Механіка">Механіка</MenuItem>
            <MenuItem value="Автомат">Автомат</MenuItem>
            <MenuItem value="Робот">Робот</MenuItem>
            <MenuItem value="Варіатор">Варіатор</MenuItem>
          </TextField>

          <TextField select label="Привід" name="driveType" value={form.driveType} onChange={handleChange}>
            <MenuItem value="">Виберіть</MenuItem>
            <MenuItem value="Передній">Передній</MenuItem>
            <MenuItem value="Задній">Задній</MenuItem>
            <MenuItem value="Повний">Повний</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Довжина, мм" name="lengthMm" value={form.lengthMm} onChange={handleChange} />
          <TextField label="Ширина, мм" name="widthMm" value={form.widthMm} onChange={handleChange} />
          <TextField label="Висота, мм" name="heightMm" value={form.heightMm} onChange={handleChange} />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Колісна база, мм" name="wheelbaseMm" value={form.wheelbaseMm} onChange={handleChange} />
          <TextField
            label="Споряджена маса, кг"
            name="curbWeightKg"
            value={form.curbWeightKg}
            onChange={handleChange}
          />
          <TextField label="Повна маса, кг" name="grossWeightKg" value={form.grossWeightKg} onChange={handleChange} />
        </Box>
        {/* DYNAMIC SPECS */}
        <Typography variant="h6" mt={2}>
          Опції
        </Typography>
        {form.specs.map((spec, specIndex) => (
          <Box key={specIndex} sx={{ border: '1px solid #ccc', p: 1, mb: 1 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <TextField
                label="Назва секції"
                value={spec.title}
                onChange={(e) => updateSpecTitle(specIndex, e.target.value)}
              />
              <Button variant="outlined" color="error" onClick={() => removeSpecSection(specIndex)}>
                Видалити секцію
              </Button>
            </Stack>

            {spec.items.map((item, itemIndex) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={itemIndex}
                mt={1}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <TextField
                  label="Назва опції"
                  value={item.label}
                  onChange={(e) => updateSpecItem(specIndex, itemIndex, 'label', e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.value}
                      onChange={(e) => updateSpecItem(specIndex, itemIndex, 'value', e.target.checked)}
                    />
                  }
                  label="Активна (+)"
                />
                <Button variant="outlined" color="error" onClick={() => removeSpecItem(specIndex, itemIndex)}>
                  Видалити
                </Button>
              </Stack>
            ))}
            <Button variant="outlined" onClick={() => addSpecItem(specIndex)} sx={{ mt: 1 }}>
              Додати опцію
            </Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={addSpecSection}>
          Додати секцію
        </Button>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
            Зберегти авто
          </Button>
          <Button variant="outlined" color="error" onClick={onClose}>
            Закрити
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
