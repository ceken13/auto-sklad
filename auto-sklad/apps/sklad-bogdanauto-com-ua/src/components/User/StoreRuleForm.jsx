import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import { getOrganizations } from '../../api/organizations.api';

export default function StoreRuleForm({ initialData, onSubmit, organizationSlug, isSuperadmin }) {
  const [organizations, setOrganizations] = useState([]);

  const [form, setForm] = useState({
    storeId: initialData?.storeId || '',
    storeName: initialData?.storeName || '',
    dealerCity: initialData?.dealerCity || '',
    organizationSlug: initialData?.organizationSlug || organizationSlug || '',
    inUkraine: initialData?.inUkraine || false,
  });

  // ---------------- LOAD ORGANIZATIONS ----------------

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (!initialData && organizationSlug && organizations.length) {
      const org = organizations.find((o) => o.slug === organizationSlug);

      setForm((prev) => ({
        ...prev,
        organizationSlug,
        dealerCity: org?.city || '',
      }));
    }
  }, [organizationSlug, organizations, initialData]);

  // ---------------- AUTO SET CITY ----------------

  const handleOrganizationChange = (slug) => {
    const org = organizations.find((o) => o.slug === slug);

    setForm((prev) => ({
      ...prev,
      organizationSlug: slug,
      dealerCity: org?.city || '',
    }));
  };

  // ---------------- CHANGE ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'organizationSlug') {
      const org = organizations.find((o) => o.slug === value);

      setForm((prev) => ({
        ...prev,
        organizationSlug: value,
        dealerCity: org?.city || '',
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setForm((prev) => ({
      ...prev,
      inUkraine: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  console.log('organizationSlug prop:', organizationSlug);
  console.log('form.organizationSlug:', form.organizationSlug);
  console.log('organizations:', organizations);
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Store ID" name="storeId" value={form.storeId} onChange={handleChange} fullWidth required />

        <TextField
          label="Store Name"
          name="storeName"
          value={form.storeName}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* ORGANIZATION */}
        <FormControl fullWidth>
          <InputLabel>Організація</InputLabel>

          <Select
            name="organizationSlug"
            value={form.organizationSlug}
            onChange={handleChange}
            disabled={!isSuperadmin}
          >
            {organizations.map((org) => (
              <MenuItem key={org.slug} value={org.slug}>
                {org.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* CITY */}
        <TextField label="Dealer City" name="dealerCity" value={form.dealerCity} fullWidth onChange={handleChange} />

        <FormControlLabel
          control={<Checkbox checked={form.inUkraine} onChange={handleCheckboxChange} />}
          label="Авто в Україні"
        />

        <Button type="submit" variant="contained">
          Зберегти
        </Button>
      </Stack>
    </Box>
  );
}
