import { useEffect, useState } from 'react';

import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';

import { getOrganizations } from '../../api/organizations.api';

export function AdminUserListForm({ onSubmit, initialData = null }) {
  const [organizations, setOrganizations] = useState([]);

  const [form, setForm] = useState({
    username: initialData?.username || '',
    password: '',
    organizationSlug: initialData?.organizationSlug || '',
  });

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();

      setOrganizations(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} required fullWidth />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required={!initialData}
          fullWidth
        />

        <TextField
          select
          label="Організація"
          name="organizationSlug"
          value={form.organizationSlug}
          onChange={handleChange}
          required
          fullWidth
        >
          {organizations.map((organization) => (
            <MenuItem key={organization.slug} value={organization.slug}>
              {organization.name}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained">
          {initialData ? 'Оновити' : 'Створити'}
        </Button>
      </Stack>
    </Box>
  );
}

export default AdminUserListForm;
