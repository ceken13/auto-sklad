import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { BottomMenu } from './BottomMenu';
import { TopMenu } from './TopMenu';
import { ContactBar } from './ContactBar';
import { ImgLogo } from './imgLogo';
import { Box, Typography } from '@mui/material';

export function Header() {
  const styles = getStyles(theme);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  return (
    <Box>
      <div>
        <header style={{ ...styles.header, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ContactBar />
            <TopMenu />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ImgLogo />
            <BottomMenu />
            <Typography sx={{ fontWeight: '700', fontSize: '20px', paddingRight: '20px' }}>
              Богдан-Авто Запоріжжя
            </Typography>
          </Box>
        </header>
      </div>
    </Box>
  );
}

export default Header;
