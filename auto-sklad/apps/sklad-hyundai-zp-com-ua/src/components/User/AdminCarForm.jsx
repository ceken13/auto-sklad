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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sortable from 'sortablejs';

export default function AdminCarForm({ onSubmit, editingCar }) {
  const MAX_FILE_SIZE = 500 * 1024;
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const isValidImageFile = (file) => validTypes.includes(file.type) && file.size <= MAX_FILE_SIZE;

  const emptySpec = { title: '', items: [] };

  const [form, setForm] = useState({
    carBrand: '',
    model: '',
    imgCar: '',
    sliderImages: [],
    bealerName: '',
    dealerSity: '',
    engine: '',
    enginePowerHP: '',
    year: '',
    interiorColor: '',
    exteriorColor: '',
    regularPrice: '',
    loanRepayment: '',
    specialOffer: false,
    pickUpOffer: false,
    usedCars: false,
    inUkraine: true,
    availablCar: true,
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
    specs: [emptySpec], // одна порожня секція спочатку
  });

  const sortableRef = useRef(null);
  const sortableInstance = useRef(null);

  useEffect(() => {
    if (editingCar) setForm(editingCar);
  }, [editingCar]);

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
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" mb={2}>
        {editingCar ? 'Редагувати авто' : 'Додати авто'}
      </Typography>

      <Stack spacing={2}>
        {/* Основні поля */}

        <Box sx={{ display: 'flex', gap: '20px', '& > *': { flex: 1 } }}>
          <TextField label="Марка" name="carBrand" value={form.carBrand} onChange={handleChange} />
          <TextField label="Модель" name="model" value={form.model} onChange={handleChange} />
        </Box>
        <Button variant="outlined" component="label">
          Головне зображення
          <input type="file" hidden accept="image/png,image/jpeg" onChange={handleMainImage} />
        </Button>
        {form.imgCar && <img src={form.imgCar} width={150} alt="Головне фото" />}
        <Button variant="outlined" component="label">
          Зображення для слайдера
          <input type="file" hidden accept="image/png,image/jpeg" multiple onChange={handleSliderImages} />
        </Button>
        <Stack direction="row" spacing={1} ref={sortableRef} sx={{ flexWrap: 'wrap', cursor: 'grab' }}>
          {form.sliderImages.map((img) => (
            <Box key={img} sx={{ position: 'relative' }}>
              <img src={img} width={100} height={60} alt="" style={{ userSelect: 'none' }} />
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
          <TextField label="Назва дилера" name="bealerName" value={form.bealerName} onChange={handleChange} />
          <TextField label="Місто" name="dealerSity" value={form.dealerSity} onChange={handleChange} />
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
            control={<Checkbox name="availablCar" checked={form.availablCar} onChange={handleChange} />}
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

        <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
          Зберегти авто
        </Button>
      </Stack>
    </Box>
  );
}
